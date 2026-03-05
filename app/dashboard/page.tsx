"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { KpiCards } from "@/components/kpi-cards"
import { ChartsSection } from "@/components/charts-section"
import { PriorityTable } from "@/components/priority-table"
import { StrategicSection } from "@/components/strategic-section"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">

      <DashboardSidebar />

      <main className="flex-1">

        <DashboardHeader />

        <div className="p-6 space-y-6">

          <KpiCards />

          <div className="grid grid-cols-2 gap-6">
            <ChartsSection />
            <StrategicSection />
          </div>

          <PriorityTable />

        </div>

      </main>

    </div>
  )
}