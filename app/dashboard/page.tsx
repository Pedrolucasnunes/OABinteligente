"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { KpiCards } from "@/components/kpi-cards"
import { ChartsSection } from "@/components/charts-section"
import { PriorityTable } from "@/components/priority-table"
import { StrategicSection } from "@/components/strategic-section"

import { getUserAnalysis } from "@/lib/services/analysisService"

export default function DashboardPage() {

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

  if (!analysis) {
    return <div>Carregando dashboard...</div>
  }

  const hasData = analysis.studyScore > 0

  return (
    <div className="flex min-h-screen bg-background">

      <DashboardSidebar />

      <main className="flex-1">

        <DashboardHeader />

        <div className="p-6 space-y-6">

          <KpiCards analysis={analysis} />

          {/* MATÉRIAS CRÍTICAS + GANHOS RÁPIDOS */}
          {hasData && (
            <StrategicSection analysis={analysis} subjectsMap={subjectsMap} />
          )}

          {/* GRÁFICOS */}
          <ChartsSection
            analysis={analysis}
            subjectsMap={subjectsMap}
          />

          {/* MAPA DE PRIORIDADES */}
          <PriorityTable
            analysis={analysis}
            subjectsMap={subjectsMap}
          />

        </div>

      </main>

    </div>
  )
}