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
  const [projectedScore, setProjectedScore] = useState<number | null>(null)
  const [missingPoints, setMissingPoints] = useState<number | null>(null)
  const [criticalSubjects, setCriticalSubjects] = useState<any[]>([])
  const [strategicSimulations, setStrategicSimulations] = useState<any[]>([])
  const [strategicPlan, setStrategicPlan] = useState<any[]>([])
  const [confidenceIndex, setConfidenceIndex] = useState<number | null>(null)
  const [approvalProbability, setApprovalProbability] = useState<number | null>(null)

  useEffect(() => {
    checkUser()
  }, [])
  function calculateConfidence(totalQuestions: number) {
    const k = 0.01
    const confidence = 1 - Math.exp(-k * totalQuestions)
    return Number((confidence * 100).toFixed(1))
  }

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
    await calculateProjectedScore(user.id)
    await calculateCriticalSubjects(user.id)
    await calculateStrategicSimulation(user.id)
    await calculateStrategicPlan(user.id)
  }

  function calculateApprovalProbability(score: number, confidence: number | null) {
    if (confidence === null) return null

    const a = 0.35
    const logistic = 1 / (1 + Math.exp(-a * (score - 40)))

    // ajusta pela confiabilidade
    const adjusted = logistic * (confidence / 100)

    return Number((adjusted * 100).toFixed(1))
  }

  async function fetchQuestion() {
    let questions

    const useCritical = Math.random() < 0.7 && criticalSubjects.length > 0

    if (useCritical) {
      const criticalIds = criticalSubjects.map((s) => s.subject_id)

      const { data } = await supabase
        .from("questions")
        .select("*")
        .in("subject_id", criticalIds)

      questions = data
    } else {
      const { data } = await supabase
        .from("questions")
        .select("*")

      questions = data
    }

    if (questions && questions.length > 0) {
      const randomIndex = Math.floor(Math.random() * questions.length)

      setQuestion(questions[randomIndex])
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
      const percentage =
        total > 0 ? ((correct / total) * 100).toFixed(1) : "0"

      setStats({
        total,
        correct,
        wrong: total - correct,
        percentage,
      })
      const confidence = calculateConfidence(total)
      setConfidenceIndex(confidence)
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

  async function calculateProjectedScore(uid: string) {
    const { data: exam } = await supabase
      .from("exams")
      .select("*")
      .eq("name", "OAB 1ª Fase")
      .single()

    if (!exam) return

    const { data: distribution } = await supabase
      .from("exam_subject_distribution")
      .select("subject_id, question_count")
      .eq("exam_id", exam.id)

    const { data: attempts } = await supabase
      .from("attempts")
      .select("subject_id, is_correct")
      .eq("user_id", uid)

    if (!distribution || !attempts) return

    const grouped: Record<string, { total: number; correct: number }> = {}

    attempts.forEach((a) => {
      if (!grouped[a.subject_id]) {
        grouped[a.subject_id] = { total: 0, correct: 0 }
      }
      grouped[a.subject_id].total++
      if (a.is_correct) grouped[a.subject_id].correct++
    })

    let projected = 0

    distribution.forEach((item) => {
      const stats = grouped[item.subject_id]
      if (stats && stats.total > 0) {
        const performance = stats.correct / stats.total
        projected += performance * item.question_count
      }
    })

    const rounded = Number(projected.toFixed(1))
    const missing = exam.passing_score - rounded

    setProjectedScore(rounded)
    const probability = calculateApprovalProbability(rounded, confidenceIndex)
    setApprovalProbability(probability)
    setMissingPoints(missing > 0 ? Number(missing.toFixed(1)) : 0)
  }

  // MATÉRIAS CRÍTICAS
  async function calculateCriticalSubjects(uid: string) {
    const { data: exam } = await supabase
      .from("exams")
      .select("id")
      .eq("name", "OAB 1ª Fase")
      .single()

    if (!exam) return

    const { data: distribution } = await supabase
      .from("exam_subject_distribution")
      .select("subject_id, question_count")
      .eq("exam_id", exam.id)

    const { data: attempts } = await supabase
      .from("attempts")
      .select("subject_id, is_correct")
      .eq("user_id", uid)

    if (!distribution || !attempts) return

    const grouped: Record<string, { total: number; correct: number }> = {}

    attempts.forEach((a) => {
      if (!grouped[a.subject_id]) {
        grouped[a.subject_id] = { total: 0, correct: 0 }
      }
      grouped[a.subject_id].total++
      if (a.is_correct) grouped[a.subject_id].correct++
    })

    const riskList: any[] = []

    distribution.forEach((item) => {
      const stats = grouped[item.subject_id]
      if (stats && stats.total > 0) {
        const performance = stats.correct / stats.total
        const errorRate = 1 - performance
        const impact = item.question_count * errorRate

        riskList.push({
          subject_id: item.subject_id,
          performance: (performance * 100).toFixed(1),
          impact,
        })
      }
    })

    riskList.sort((a, b) => b.impact - a.impact)
    setCriticalSubjects(riskList.slice(0, 3))
  }

  // ESTRATÉGIA DE GANHO RÁPIDO
  async function calculateStrategicSimulation(uid: string) {
    if (!projectedScore) return

    const simulations: any[] = []

    criticalSubjects.forEach((subject) => {
      const gain = subject.impact * 0.4

      simulations.push({
        subject_id: subject.subject_id,
        gain: gain.toFixed(1),
      })
    })

    setStrategicSimulations(simulations.slice(0, 3))
  }

  // PLANO AUTOMÁTICO PARA BATER 40
  async function calculateStrategicPlan(uid: string) {
    if (!projectedScore) return

    if (projectedScore >= 40) {
      setStrategicPlan([])
      return
    }

    const needed = 40 - projectedScore

    const plans = criticalSubjects.map((subject) => ({
      subject_id: subject.subject_id,
      target: "Elevar desempenho",
      impact: subject.impact?.toFixed(1) ?? "0"
    }))

    setStrategicPlan(plans.slice(0, 3))
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
    await calculateProjectedScore(userId)
    await calculateCriticalSubjects(userId)
    await calculateStrategicSimulation(userId)
    await calculateStrategicPlan(userId)
    await fetchQuestion()
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

      {/* QUESTÕES */}
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

      {/* NOTA PROJETADA */}
      {approvalProbability !== null && (
        <div className="mt-4">
          <p className="text-lg font-semibold text-purple-700">
            Probabilidade Real de Aprovação: {approvalProbability}%
          </p>
        </div>
      )}

      {projectedScore !== null && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-2">Nota Projetada</h2>
          <p className="text-2xl font-bold">{projectedScore} / 80</p>

          {missingPoints! > 0 ? (
            <p className="text-red-600 font-semibold mt-2">
              Faltam {missingPoints} pontos para aprovação.
            </p>
          ) : (
            <p className="text-green-600 font-semibold mt-2">
              Você está acima da linha de aprovação!
            </p>
          )}
        </div>
      )}

      {/* ESTRATÉGIA DE GANHO RÁPIDO */}
      {strategicSimulations.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-3">Estratégia de Ganho Rápido:</h2>

          {strategicSimulations.map((sim, index) => (
            <div key={index} className="mb-2">
              <p>
                Se você elevar{" "}
                <strong>
                  {subjectsMap[sim.subject_id] || "Matéria"}
                </strong>{" "}
                para 60%, pode ganhar aproximadamente{" "}
                <strong>+{sim.gain}</strong> pontos.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PLANO ESTRATÉGICO AUTOMÁTICO */}
      {strategicPlan.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-3">
            Plano Estratégico para bater 40 pontos:
          </h2>

          {strategicPlan.map((plan, index) => (
            <div key={index} className="mb-2">
              <p>
                Priorize{" "}
                <strong>
                  {subjectsMap[plan.subject_id] || "Matéria"}
                </strong>{" "}
                — impacto estimado de {plan.impact} pontos.
              </p>
            </div>
          ))}
        </div>
      )}

      {/* MATÉRIAS CRÍTICAS */}
      {criticalSubjects.length > 0 && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-3">
            Matérias que mais impactam sua aprovação:
          </h2>

          {criticalSubjects.map((subject, index) => (
            <div key={index} className="mb-2">
              <p>
                {index + 1}º{" "}
                {subjectsMap[subject.subject_id] || "Matéria"} —{" "}
                <strong>{subject.performance}% de acerto</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* DESEMPENHO GERAL */}
      {stats && (
        <div className="mt-6 bg-white p-4 rounded shadow max-w-xl text-black">
          <h2 className="font-bold mb-2">Seu desempenho geral:</h2>
          <p>Total respondidas: {stats.total}</p>
          <p>Acertos: {stats.correct}</p>
          <p>Erros: {stats.wrong}</p>
          <p>Taxa de acerto: {stats.percentage}%</p>
          {confidenceIndex !== null && (
            <p className="mt-2 text-blue-600 font-semibold">
              Índice de Confiabilidade Estatística: {confidenceIndex}%
            </p>
          )}
        </div>
      )}

      {/* DESEMPENHO POR MATÉRIA */}
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