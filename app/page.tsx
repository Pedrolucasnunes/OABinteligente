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

  useEffect(() => {
    fetchQuestion()
    fetchStats()
    fetchStatsBySubject()
    fetchSubjects()
  }, [])

  async function fetchQuestion() {
    const { data, error } = await supabase
      .from("questions")
      .select("*")

    if (error) {
      console.error(error)
      return
    }

    if (data && data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      setQuestion(data[randomIndex])
      setSelected(null)
      setResult(null)
    }
  }

  async function fetchStats() {
    const { data, error } = await supabase
      .from("attempts")
      .select("*")

    if (error) {
      console.error(error)
      return
    }

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

  async function fetchStatsBySubject() {
    const { data, error } = await supabase
      .from("attempts")
      .select("subject_id, is_correct")

    if (error || !data) return

    const grouped: Record<string, { total: number; correct: number }> = {}

    data.forEach((item) => {
      if (!grouped[item.subject_id]) {
        grouped[item.subject_id] = { total: 0, correct: 0 }
      }

      grouped[item.subject_id].total++
      if (item.is_correct) {
        grouped[item.subject_id].correct++
      }
    })

    const result = Object.entries(grouped).map(([subject_id, values]) => ({
      subject_id,
      total: values.total,
      correct: values.correct,
      percentage: ((values.correct / values.total) * 100).toFixed(1),
    }))

    setStatsBySubject(result)
  }

  async function handleAnswer(option: string) {
    if (!question) return

    setSelected(option)

    const isCorrect = option === question.correct_option

    if (isCorrect) {
      setResult("Correto ✅")
    } else {
      setResult("Errado ❌")
    }

    await supabase.from("attempts").insert([
      {
        question_id: question.id,
        selected_option: option,
        is_correct: isCorrect,
        subject_id: question.subject_id,
      },
    ])

    await fetchStats()
    await fetchStatsBySubject()
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
        <div className="bg-white p-6 rounded shadow max-w-xl text-black">
          <p className="font-semibold mb-4">
            {question.statement}
          </p>

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

          {result && (
            <div className="mt-4 font-bold">
              {result}
            </div>
          )}

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