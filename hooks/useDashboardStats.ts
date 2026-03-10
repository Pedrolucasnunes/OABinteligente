import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useDashboardStats() {

  const [stats, setStats] = useState<any>(null)

  useEffect(() => {
    loadStats()
  }, [])

  async function loadStats() {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data: attempts } = await supabase
      .from("attempts")
      .select("*")
      .eq("user_id", user.id)

    const total = attempts.length
    const correct = attempts.filter(a => a.is_correct).length

    const accuracy = total ? (correct / total) * 100 : 0

    setStats({
      total,
      correct,
      accuracy
    })

  }

  return stats

}