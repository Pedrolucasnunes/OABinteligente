"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [question, setQuestion] = useState<any>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    async function fetchQuestion() {
      const { data } = await supabase
        .from("questions")
        .select("*")

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length)
          setQuestion(data[randomIndex])
    }

      setQuestion(data)
    }

    fetchQuestion()
  }, [])

  function handleAnswer(option: string) {
    setSelected(option)

    if (option === question.correct_option) {
      setResult("Correto ✅")
    } else {
      setResult("Errado ❌")
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-black">
        OABinteligente
      </h1>

      {question && (
        <div className="bg-white p-6 rounded shadow max-w-xl text-black">
          <p className="font-semibold mb-4">
            {question.statement}
          </p>

          <div className="space-y-3">
            {["A", "B", "C", "D", "E"].map((letter) => (
              <button
                key={letter}
                onClick={() =>
                  handleAnswer(letter)
                }
                className="w-full text-left p-3 border rounded hover:bg-gray-100"
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
        </div>
      )}
    </main>
  )
}