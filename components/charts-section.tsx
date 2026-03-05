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

const subjectPerformance = [
  // CORES VERDES (BOM) -> chart-1
  { name: "Const.", value: 72, fill: "var(--color-chart-1)" },
  { name: "Penal", value: 68, fill: "var(--color-chart-1)" },
  { name: "Dir.Humanos", value: 74, fill: "var(--color-chart-1)" },
  { name: "Empresarial", value: 70, fill: "var(--color-chart-1)" },

  // CORES LARANJAS (ATENÇÃO) -> chart-4
  { name: "Civil", value: 61, fill: "var(--color-chart-4)" },
  { name: "Trabalho", value: 58, fill: "var(--color-chart-4)" },
  { name: "Proc.Civil", value: 55, fill: "var(--color-chart-4)" },
  { name: "Proc.Penal", value: 62, fill: "var(--color-chart-4)" },
  { name: "Ética", value: 65, fill: "var(--color-chart-4)" },

  // CORES VERMELHAS (CRÍTICO) -> chart-3 (conforme seu globals.css ajustado)
  { name: "Admin.", value: 35, fill: "var(--color-chart-3)" },
  { name: "Tributário", value: 28, fill: "var(--color-chart-3)" },
  { name: "Ambiental", value: 38, fill: "var(--color-chart-3)" },
]

const scoreEvolution = [
  { week: "Sem 1", score: 42 },
  { week: "Sem 2", score: 45 },
  { week: "Sem 3", score: 48 },
  { week: "Sem 4", score: 46 },
  { week: "Sem 5", score: 52 },
  { week: "Sem 6", score: 55 },
  { week: "Sem 7", score: 58 },
  { week: "Sem 8", score: 60 },
  { week: "Sem 9", score: 63 },
  { week: "Sem 10", score: 67 },
  { week: "Sem 11", score: 69 },
  { week: "Sem 12", score: 72 },
]

function CustomBarTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-foreground mb-1">{label}</p>
        <div className="flex items-center gap-2">
           <div className="size-2 rounded-full" style={{ backgroundColor: payload[0].payload.fill }} />
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

export function ChartsSection() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      
      {/* PERFORMANCE POR MATÉRIA */}
      <Card className="border border-border/50 bg-card shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold">Desempenho por Matéria</CardTitle>
          <CardDescription>
            Taxa de acerto por disciplina na última semana
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-72 mt-4">
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
                  tick={{ fontSize: 10, fill: "oklch(0.55 0 0)", fontWeight: 500 }}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  interval={0}
                />

                <YAxis
                  tick={{ fontSize: 10, fill: "oklch(0.55 0 0)" }}
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
                  animationDuration={1500}
                >
                  {subjectPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
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
          <CardTitle className="text-base font-bold">Evolução do Score</CardTitle>
          <CardDescription>
            Seu crescimento médio nos últimos 3 meses
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={scoreEvolution}
                margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="oklch(0.55 0.18 255.32)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor="oklch(0.55 0.18 255.32)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="oklch(0.92 0 0)"
                  vertical={false}
                />

                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />

                <YAxis
                  tick={{ fontSize: 11, fill: "oklch(0.55 0 0)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[30, 80]}
                  tickFormatter={(v) => `${v}%`}
                />

                <Tooltip content={<CustomLineTooltip />} />

                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="oklch(0.55 0.18 255.32)"
                  strokeWidth={3}
                  fill="url(#scoreGradient)"
                  dot={false}
                  activeDot={{
                    r: 6,
                    stroke: "white",
                    strokeWidth: 2,
                    fill: "oklch(0.55 0.18 255.32)",
                  }}
                />

              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3 py-2 px-4 rounded-full bg-blue-50 border border-blue-100">
            <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-xs font-medium text-blue-700">
              Meta de aprovação: 50% (40 acertos de 80 questões)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}