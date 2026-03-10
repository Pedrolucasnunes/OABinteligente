"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useSimuladoHistory() {

  const [sessions, setSessions] = useState<any[]>([])

  useEffect(() => {
    loadSessions()
  }, [])

  async function loadSessions() {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("exam_sessions")
      .select("*")
      .eq("user_id", user.id)
      .order("finished_at", { ascending: true })

    setSessions(data || [])
  }

  return { sessions }
}