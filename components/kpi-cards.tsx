"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Award } from "lucide-react"

const kpis = [
  {
    title: "Score de Estudo",
    value: "72%",
    subtitle: "Baseado no seu desempenho geral",
    icon: TrendingUp,
    trend: "+4% esta semana",
    trendPositive: true,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Probabilidade de Aprovação",
    value: "64%",
    subtitle: "Estimativa baseada no seu progresso",
    icon: Target,
    trend: "+2% desde o último simulado",
    trendPositive: true,
    color: "text-status-medium",
    bgColor: "bg-status-medium/10",
  },
  {
    title: "Nota Projetada",
    value: "52/80",
    subtitle: "Projeção para a próxima prova",
    icon: Award,
    trend: "Meta: 40 acertos",
    trendPositive: true,
    color: "text-status-safe",
    bgColor: "bg-status-safe/10",
  },
]

export function KpiCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <Card
          key={kpi.title}
          className="relative overflow-hidden border-none shadow-sm"
        >
          <CardContent className="pt-0">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {kpi.title}
                </p>
                <p className="text-3xl font-bold tracking-tight text-card-foreground">
                  {kpi.value}
                </p>
                <p className="text-xs text-muted-foreground">{kpi.subtitle}</p>
              </div>
              <div
                className={`flex size-11 items-center justify-center rounded-xl ${kpi.bgColor}`}
              >
                <kpi.icon className={`size-5 ${kpi.color}`} />
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className={`text-xs font-medium ${
                  kpi.trendPositive
                    ? "text-status-safe"
                    : "text-status-critical"
                }`}
              >
                {kpi.trend}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
