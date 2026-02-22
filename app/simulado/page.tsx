"use client"

import { useEffect, useState } from "react"
import { supabase } from "../../lib/supabase"

export default function Simulado() {
  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)
  const [resultSaved, setResultSaved] = useState(false)

  useEffect(() => {
    fetchSimulado()
  }, [])

  useEffect(() => {
    if (finished && !resultSaved) {
      saveResult()
      setResultSaved(true)
    }
  }, [finished])

  async function fetchSimulado() {
    const { data, error } = await supabase
      .from("questions")
      .select("*")
      .limit(80)

    if (error) {
      console.error(error)
      return
    }

    if (data) {
      setQuestions(data)
    }
  }

  function handleAnswer(option: string) {
    const currentQuestion = questions[currentIndex]

    setAnswers({
      ...answers,
      [currentQuestion.id]: option,
    })
  }

  function nextQuestion() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setFinished(true)
    }
  }

  function calculateResult() {
    let correct = 0

    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) {
        correct++
      }
    })

    return correct
  }

  async function saveResult() {
    const correct = calculateResult()
    const total = questions.length
    const percentage = (correct / total) * 100

    await supabase.from("simulados").insert([
      {
        total_questoes: total,
        acertos: correct,
        percentual: percentage,
        aprovado: correct >= 40,
      },
    ])
  }

  if (questions.length === 0) {
    return <div className="p-10">Carregando simulado...</div>
  }

  if (finished) {
    const correct = calculateResult()
    const total = questions.length
    const percentage = ((correct / total) * 100).toFixed(1)
    const faltaram = 40 - correct

    return (
      <div className="min-h-screen bg-gray-100 p-10 text-black">
        <h1 className="text-3xl font-bold mb-6">
          Resultado do Simulado
        </h1>

        <div className="bg-white p-6 rounded shadow max-w-xl">
          <p className="text-lg">
            Você acertou <strong>{correct}</strong> de {total} questões.
          </p>

          <p className="mt-2">
            Taxa de acerto: <strong>{percentage}%</strong>
          </p>

          <p className="mt-4 text-xl font-bold">
            {correct >= 40 ? "🎉 APROVADO!" : "❌ Ainda não atingiu a nota mínima."}
          </p>

          {correct < 40 && (
            <p className="mt-2">
              Faltaram <strong>{faltaram}</strong> questões para a aprovação.
            </p>
          )}

          {correct >= 35 && correct < 40 && (
            <p className="mt-4 text-blue-600 font-semibold">
              Você está muito próximo da aprovação. Pequenos ajustes podem fazer a diferença.
            </p>
          )}

          {correct < 35 && (
            <p className="mt-4 text-red-600 font-semibold">
              Seu desempenho ainda está abaixo do ideal. Foque nas matérias com menor taxa de acerto.
            </p>
          )}

          {correct >= 45 && (
            <p className="mt-4 text-green-600 font-semibold">
              Excelente desempenho! Você já demonstra segurança para a prova.
            </p>
          )}

          <button
            onClick={() => window.location.reload()}
            className="mt-6 bg-black text-white px-4 py-2 rounded"
          >
            Refazer Simulado
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  return (
    <main className="min-h-screen bg-gray-100 p-10 text-black">
      <h1 className="text-2xl font-bold mb-4">
        Simulado Oficial OAB
      </h1>

      <p className="mb-2">
        Questão {currentIndex + 1} de {questions.length}
      </p>

      <div className="bg-white p-6 rounded shadow max-w-xl">
        <p className="font-semibold mb-4">
          {currentQuestion.statement}
        </p>

        <div className="space-y-3">
          {["A", "B", "C", "D", "E"].map((letter) => (
            <button
              key={letter}
              onClick={() => handleAnswer(letter)}
              className="w-full text-left p-3 border rounded hover:bg-gray-100"
            >
              {letter}){" "}
              {currentQuestion[`option_${letter.toLowerCase()}`]}
            </button>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Próxima
        </button>
      </div>
    </main>
  )
}