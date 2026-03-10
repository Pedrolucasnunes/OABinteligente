import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useSimuladoStats(userId: string | null) {

  const [stats, setStats] = useState({
    total: 0,
    bestScore: 0,
    lastScore: 0
  })

  useEffect(() => {
    if (!userId) return

    fetchSimulados()

  }, [userId])

  async function fetchSimulados() {

    const { data } = await supabase
      .from("exam_sessions")
      .select("correct_answers, finished_at")
      .order("finished_at", { ascending: true })

    if (!data || data.length === 0) return

    const total = data.length

    const bestScore = Math.max(
      ...data.map((s) => s.correct_answers)
    )

    const lastScore = data[data.length - 1].correct_answers

    setStats({
      total,
      bestScore,
      lastScore
    })
  }

  return stats
}