"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { ProgressBar } from "@/components/simulado/ProgressBar"
import { QuestionGrid } from "@/components/simulado/QuestionGrid"
import { AnswerOptions } from "@/components/simulado/AnswerOptions"
import { NavigationButtons } from "@/components/simulado/NavigationButtons"

export default function Simulado() {

  const [questions, setQuestions] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)
  const [sessionId, setSessionId] = useState<string | null>(null)

  useEffect(() => {
    startSimulado()
  }, [])

  async function startSimulado() {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      console.error("Usuário não autenticado")
      return
    }

    const { data: session, error } = await supabase
      .from("exam_sessions")
      .insert({
        user_id: user.id,
        total_questions: 80,
        correct_answers: 0,
        percentage: 0,
        approved: false
      })
      .select()
      .single()

    if (error) {
      console.error("Erro ao criar sessão:", error)
      return
    }

    setSessionId(session.id)

    fetchQuestions()

  }

  async function fetchQuestions() {

    // 1️⃣ pegar distribuição da prova
    const { data: distribution } = await supabase
      .from("exam_subject_distribution")
      .select("*")

    if (!distribution) return

    let examQuestions: any[] = []

    // 2️⃣ buscar questões por matéria
    for (const item of distribution) {

      const { data: subjectQuestions } = await supabase
        .from("questions")
        .select("*")
        .eq("subject_id", item.subject_id)
        .limit(item.question_count)
        .order("created_at", { ascending: false })

      if (subjectQuestions) {
        examQuestions = [...examQuestions, ...subjectQuestions]
      }

    }

    // 3️⃣ embaralhar
    examQuestions = examQuestions.sort(() => Math.random() - 0.5)

    setQuestions(examQuestions)

  }

  async function handleAnswer(option: string) {

    const question = questions[currentIndex]

    setAnswers(prev => ({
      ...prev,
      [question.id]: option
    }))

  }

  async function nextQuestion() {

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
    } else {
      finishSimulado()
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

  function calculateSubjectPerformance() {

    const stats: Record<string, { correct: number; total: number }> = {}

    questions.forEach((q) => {

      const subject = q.subject_id

      if (!stats[subject]) {
        stats[subject] = { correct: 0, total: 0 }
      }

      stats[subject].total++

      if (answers[q.id] === q.correct_option) {
        stats[subject].correct++
      }

    })

    return Object.entries(stats).map(([subject, data]) => ({
      subject,
      accuracy: Math.round((data.correct / data.total) * 100),
      correct: data.correct,
      total: data.total
    }))

  }

  async function saveAttemptsBatch() {

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const attempts = questions
      .filter((q) => answers[q.id])
      .map((q) => {

        const selected = answers[q.id]

        return {
          question_id: q.id,
          subject_id: q.subject_id,
          selected_option: selected,
          is_correct: selected === q.correct_option,
          user_id: user.id,
          exam_session_id: sessionId
        }

      })

    await supabase.from("attempts").insert(attempts)

  }

  async function finishSimulado() {

    if (finished) return

    await saveAttemptsBatch()

    const correct = calculateResult()
    const total = questions.length
    const percentage = (correct / total) * 100

    await supabase
      .from("exam_sessions")
      .update({
        correct_answers: correct,
        percentage,
        approved: correct >= 40,
        finished_at: new Date().toISOString()
      })
      .eq("id", sessionId)

    setFinished(true)

  }

  if (questions.length === 0) {
    return <div className="p-10">Carregando simulado...</div>
  }

  if (finished) {

    const correct = calculateResult()
    const total = questions.length
    const percentage = ((correct / total) * 100).toFixed(1)
    const subjectPerformance = calculateSubjectPerformance()

    return (

      <div className="min-h-screen bg-gray-100 p-10 text-black">

        <h1 className="text-3xl font-bold mb-6">
          Resultado do Simulado
        </h1>

        <div className="mt-8">

          <h2 className="text-xl font-bold mb-4">
            Desempenho por matéria
          </h2>

          <div className="space-y-3">

            {subjectPerformance.map((s) => (

              <div
                key={s.subject}
                className="flex justify-between bg-gray-50 p-3 rounded"
              >

                <span>
                  {s.subject}
                </span>

                <span className="font-semibold">
                  {s.correct}/{s.total} ({s.accuracy}%)
                </span>

              </div>

            ))}

          </div>

        </div>
        <div className="bg-white p-6 rounded shadow max-w-xl">

          <p className="text-lg">
            Você acertou <strong>{correct}</strong> de {total} questões
          </p>

          <p className="mt-2">
            Taxa de acerto: <strong>{percentage}%</strong>
          </p>

          <p className="mt-4 text-xl font-bold">
            {correct >= 40 ? "🎉 APROVADO!" : "❌ Ainda não atingiu a nota mínima"}
          </p>

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

      <ProgressBar
        answered={Object.keys(answers).length}
        total={questions.length}
      />

      <QuestionGrid
        questions={questions}
        answers={answers}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <div className="bg-white p-6 rounded shadow max-w-xl">

        <p className="font-semibold mb-4">
          {currentQuestion.statement}
        </p>

        <AnswerOptions
          question={currentQuestion}
          answers={answers}
          handleAnswer={handleAnswer}
        />

        <NavigationButtons
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          nextQuestion={nextQuestion}
          setFinished={setFinished}
        />

      </div>

    </main>

  )

}