"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import { getUserAnalysis } from "@/lib/services/analysisService"

export function useDashboardAnalysis() {

  const [analysis, setAnalysis] = useState<any>(null)
  const [subjectsMap, setSubjectsMap] = useState<Record<string, string>>({})

  useEffect(() => {
    loadDashboard()
  }, [])

  async function loadDashboard() {

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    const [analysisResult, subjectsResult] = await Promise.all([
      getUserAnalysis(user.id),
      supabase.from("subjects").select("id, name")
    ])

    setAnalysis(analysisResult)

    if (subjectsResult.data) {

      const map: Record<string, string> = {}

      subjectsResult.data.forEach((subject: any) => {
        map[subject.id] = subject.name
      })

      setSubjectsMap(map)

    }

  }

  return { analysis, subjectsMap }

}