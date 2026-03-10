"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
} from "recharts"

import { StudyAnalysis } from "@/lib/types/studyAnalysis"

interface Props {
  analysis: StudyAnalysis
  subjectsMap: Record<string, string>
}

function CustomBarTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div
            className="size-2 rounded-full"
            style={{ backgroundColor: payload[0].payload.fill }}
          />
          <p className="text-sm font-bold text-foreground">
            {payload[0].value}% acerto
          </p>
        </div>
      </div>
    )
  }
  return null
}

function CustomLineTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        <p className="text-sm font-bold text-primary">
          Score: {payload[0].value}%
        </p>
      </div>
    )
  }
  return null
}

export function ChartsSection({ analysis, subjectsMap }: Props) {
  // ===== PERFORMANCE POR MATÉRIA =====

    if (!analysis?.priorityMap?.length) return null
    
  const subjectPerformance = analysis.priorityMap.map((subject) => {

    let fill = "var(--color-chart-1)"

    if (subject.performance < 40) fill = "var(--color-chart-3)"
    else if (subject.performance < 60) fill = "var(--color-chart-4)"

    return {
      name: subjectsMap[subject.subject_id] || "Matéria",
      value: subject.performance,
      fill,
    }
  })

  // ===== EVOLUÇÃO DO SCORE (TEMPORÁRIO) =====

  const scoreEvolution = [
    { week: "Sem 1", score: analysis.studyScore - 20 },
    { week: "Sem 4", score: analysis.studyScore - 15 },
    { week: "Sem 6", score: analysis.studyScore - 10 },
    { week: "Sem 8", score: analysis.studyScore - 5 },
    { week: "Sem 12", score: analysis.studyScore },
  ]

  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {/* PERFORMANCE POR MATÉRIA */}
      <Card className="border border-border/50 bg-card shadow-sm">

        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">
            Desempenho por Matéria
          </CardTitle>

          <CardDescription>
            Taxa de acerto por disciplina
          </CardDescription>
        </CardHeader>

        <CardContent>

          <div className="h-72 mt-4 overflow-x-auto">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectPerformance}
                margin={{ top: 5, right: 5, left: -25, bottom: 20 }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.92 0 0)"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10 }}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />

                <Tooltip
                  content={<CustomBarTooltip />}
                  cursor={{ fill: "oklch(0.95 0 0)", opacity: 0.4 }}
                />

                <Bar
                  dataKey="value"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={28}
                >

                  {subjectPerformance.map((entry, index) => (
                    <Cell key={index} fill={entry.fill} />
                  ))}

                </Bar>

              </BarChart>
            </ResponsiveContainer>

          </div>

        </CardContent>

      </Card>

      {/* EVOLUÇÃO DO SCORE */}
      <Card className="border border-border/50 bg-card shadow-sm">

        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">
            Evolução do Score
          </CardTitle>

          <CardDescription>
            Evolução estimada do seu desempenho
          </CardDescription>
        </CardHeader>

        <CardContent>

          <div className="h-72 mt-4">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart
                data={scoreEvolution}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.92 0 0)"
                  vertical={false}
                />

                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11 }}
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={[30, 100]}
                  tickFormatter={(v) => `${v}%`}
                />

                <Tooltip content={<CustomLineTooltip />} />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="oklch(0.55 0.18 255.32)"
                  strokeWidth={3}
                  fillOpacity={0.2}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </CardContent>

      </Card>

    </div>
  )
}