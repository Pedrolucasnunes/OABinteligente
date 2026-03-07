"use client"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Target, Award } from "lucide-react"
import { StudyAnalysis } from "@/lib/types/studyAnalysis"

interface Props {
  analysis: StudyAnalysis
}

export function KpiCards({ analysis }: Props) {

  const kpis = [
    {
      title: "Score de Estudo",
      value: `${analysis.studyScore}%`,
      subtitle: "Baseado no seu desempenho geral",
      icon: TrendingUp,
      trend: "+4% esta semana",
      trendPositive: true,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Probabilidade de Aprovação",
      value: `${analysis.approvalProbability}%`,
      subtitle: "Estimativa baseada no seu progresso",
      icon: Target,
      trend: "+2% desde o último simulado",
      trendPositive: true,
      color: "text-chart-1",
      bgColor: "bg-chart-1/10",
    },
    {
      title: "Nota Projetada",
      value: `${analysis.projectedScore}/80`,
      subtitle: "Projeção para a próxima prova",
      icon: Award,
      trend: "Meta: 40 acertos",
      trendPositive: true,
      color: "text-chart-4",
      bgColor: "bg-chart-4/10",
    },
  ]

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {kpis.map((kpi) => (
        <Card
          key={kpi.title}
          className="relative overflow-hidden border border-border/50 bg-card shadow-sm transition-all hover:shadow-md"
        >
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <p className="text-sm font-bold tracking-tight text-muted-foreground/80">
                  {kpi.title}
                </p>

                <p className="text-4xl font-extrabold tracking-tighter text-foreground">
                  {kpi.value}
                </p>

                <p className="text-[11px] font-medium text-muted-foreground/60 leading-tight">
                  {kpi.subtitle}
                </p>
              </div>

              <div
                className={`flex size-12 items-center justify-center rounded-2xl shadow-inner ${kpi.bgColor}`}
              >
                <kpi.icon className={`size-6 ${kpi.color}`} />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-2">
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  kpi.trendPositive
                    ? "bg-chart-1/10 text-chart-1"
                    : "bg-chart-3/10 text-chart-3"
                )}
              >
                {kpi.trend}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}