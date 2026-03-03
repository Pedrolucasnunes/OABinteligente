"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import Link from "next/link"

export default function Home() {
  const [question, setQuestion] = useState<any>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [stats, setStats] = useState<any>(null)
  const [statsBySubject, setStatsBySubject] = useState<any[]>([])
  const [subjectsMap, setSubjectsMap] = useState<Record<string, string>>({})
  const [userId, setUserId] = useState<string | null>(null)
  const [ipo, setIpo] = useState<number | null>(null)
  const [criticalSubjects, setCriticalSubjects] = useState<any[]>([])
  const [approvalChance, setApprovalChance] = useState<number | null>(null)

  useEffect(() => {
    checkUser()
  }, [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      window.location.href = "/login"
      return
    }

    setUserId(user.id)

    await fetchSubjects()
    await fetchQuestion()
    await fetchStats(user.id)
    await fetchStatsBySubject(user.id)
    await calculateIPO(user.id)
    await calculateCriticalSubjects(user.id)
    await calculateApprovalChance(user.id)
  }

  async function fetchQuestion() {
    const { data } = await supabase.from("questions").select("*")

    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      setQuestion(data[randomIndex])
      setSelected(null)
      setResult(null)
    }
  }

  async function fetchStats(uid: string) {
    const { data } = await supabase
      .from("attempts")
      .select("*")
      .eq("user_id", uid)

    if (data) {
      const total = data.length
      const correct = data.filter((a) => a.is_correct).length
      const percentage = total > 0
        ? ((correct / total) * 100).toFixed(1)
        : "0"

      setStats({
        total,
        correct,
        wrong: total - correct,
        percentage,
      })
    }
  }

  async function fetchSubjects() {
    const { data } = await supabase.from("subjects").select("*")

    if (data) {
      const map: Record<string, string> = {}
      data.forEach((subject) => {
        map[subject.id] = subject.name
      })
      setSubjectsMap(map)
    }
  }

  async function fetchStatsBySubject(uid: string) {
    const { data } = await supabase
      .from("attempts")
      .select("subject_id, is_correct")
      .eq("user_id", uid)

    if (!data) return

    const grouped: Record<string, { total: number; correct: number }> = {}

    data.forEach((item) => {
      if (!grouped[item.subject_id]) {
        grouped[item.subject_id] = { total: 0, correct: 0 }
      }
      grouped[item.subject_id].total++
      if (item.is_correct) grouped[item.subject_id].correct++
    })

    const result = Object.entries(grouped).map(([subject_id, values]) => ({
      subject_id,
      percentage: ((values.correct / values.total) * 100).toFixed(1),
    }))

    setStatsBySubject(result)
  }

  async function calculateIPO(uid: string) {
    const { data: attempts } = await supabase
      .from("attempts")
      .select("subject_id, is_correct")
      .eq("user_id", uid)

    const { data: subjects } = await supabase
      .from("subjects")
      .select("id, weight")

    if (!attempts || !subjects) return

    const grouped: Record<string, { total: number; correct: number }> = {}

    attempts.forEach((a) => {
      if (!grouped[a.subject_id]) {
        grouped[a.subject_id] = { total: 0, correct: 0 }
      }
      grouped[a.subject_id].total++
      if (a.is_correct) grouped[a.subject_id].correct++
    })

    let weightedSum = 0
    let totalWeight = 0

    subjects.forEach((subject) => {
      const stats = grouped[subject.id]
      if (stats && stats.total >= 3) {
        const performance = stats.correct / stats.total
        weightedSum += performance * Number(subject.weight)
        totalWeight += Number(subject.weight)
      }
    })

    if (totalWeight > 0) {
      const finalScore = (weightedSum / totalWeight) * 100
      setIpo(Number(finalScore.toFixed(1)))
    } else {
      setIpo(null)
    }
  }

  async function calculateCriticalSubjects(uid: string) {
    const { data: attempts } = await supabase
      .from("attempts")
      .select("subject_id, is_correct")
      .eq("user_id", uid)

    const { data: subjects } = await supabase
      .from("subjects")
      .select("id, name, weight")

    if (!attempts || !subjects) return

    const grouped: Record<string, { total: number; correct: number }> = {}

    attempts.forEach((a) => {
      if (!grouped[a.subject_id]) {
        grouped[a.subject_id] = { total: 0, correct: 0 }
      }
      grouped[a.subject_id].total++
      if (a.is_correct) grouped[a.subject_id].correct++
    })

    const riskList: any[] = []

    subjects.forEach((subject) => {
      const stats = grouped[subject.id]
      if (stats && stats.total >= 3) {
        const performance = stats.correct / stats.total
        const risk = Number(subject.weight) * (1 - performance)

        riskList.push({
          name: subject.name,
          performance: (performance * 100).toFixed(1),
          risk,
        })
      }
    })

    riskList.sort((a, b) => b.risk - a.risk)
    setCriticalSubjects(riskList.slice(0, 3))
  }

  async function calculateApprovalChance(uid: string) {
    if (!ipo) {
      setApprovalChance(null)
      return
    }

    const { data: sessions } = await supabase
      .from("exam_sessions")
      .select("id")
      .eq("user_id", uid)

    const count = sessions?.length || 0

    let confidenceFactor = 0.85
    if (count === 1) confidenceFactor = 0.95
    if (count >= 2) confidenceFactor = 1.05

    let chance = ipo * confidenceFactor
    if (chance > 95) chance = 95
    if (chance < 5) chance = 5

    setApprovalChance(Number(chance.toFixed(1)))
  }

  async function handleAnswer(option: string) {
    if (!question || !userId) return

    setSelected(option)

    const isCorrect = option === question.correct_option
    setResult(isCorrect ? "Correto ✅" : "Errado ❌")

    await supabase.from("attempts").insert([
      {
        user_id: userId,
        question_id: question.id,
        selected_option: option,
        is_correct: isCorrect,
        subject_id: question.subject_id,
      },
    ])

    await fetchStats(userId)
    await fetchStatsBySubject(userId)
    await calculateIPO(userId)
    await calculateCriticalSubjects(userId)
    await calculateApprovalChance(userId)
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-black">
        OABinteligente
      </h1>

      <Link href="/simulado">
        <button className="mb-6 bg-black text-white px-4 py-2 rounded">
          Iniciar Simulado Oficial
        </button>
      </Link>

      {question && (
        <div className="mt-6 bg-white p-6 rounded shadow max-w-xl text-black">
          <p className="font-semibold mb-4">{question.statement}</p>

          <div className="space-y-3">
            {["A", "B", "C", "D", "E"].map((letter) => (
              <button
                key={letter}
                onClick={() => handleAnswer(letter)}
                disabled={selected !== null}
                className="w-full text-left p-3 border rounded hover:bg-gray-100 disabled:bg-gray-200"
              >
                {letter}) {question[`option_${letter.toLowerCase()}`]}
              </button>
            ))}
          </div>

          {result && <div className="mt-4 font-bold">{result}</div>}

          {result && (
            <button
              onClick={fetchQuestion}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Próxima questão
            </button>
          )}
        </div>
      )}

      {ipo !== null && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-2">Índice de Preparação OAB</h2>
          <p className="text-2xl font-bold">{ipo}</p>
        </div>
      )}

      {approvalChance !== null && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-2">Projeção de Aprovação</h2>
          <p className="text-2xl font-bold">{approvalChance}%</p>
        </div>
      )}

      {criticalSubjects.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-3">
            Matérias que mais impactam sua aprovação:
          </h2>

          {criticalSubjects.map((subject, index) => (
            <div key={index} className="mb-2">
              <p>
                {index + 1}º {subject.name} —{" "}
                <strong>{subject.performance}% de acerto</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {stats && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-2">Seu desempenho geral:</h2>
          <p>Total respondidas: {stats.total}</p>
          <p>Acertos: {stats.correct}</p>
          <p>Erros: {stats.wrong}</p>
          <p>Taxa de acerto: {stats.percentage}%</p>
        </div>
      )}

      {statsBySubject.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-2">Desempenho por Matéria:</h2>
          {statsBySubject.map((stat) => (
            <div key={stat.subject_id} className="mb-2">
              <p>
                {subjectsMap[stat.subject_id] || "Matéria"} →{" "}
                <strong>{stat.percentage}%</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}