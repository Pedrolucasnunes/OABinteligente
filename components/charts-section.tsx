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
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts"

const subjectPerformance = [
  { name: "Const.", value: 72, fill: "var(--color-status-safe)" },
  { name: "Civil", value: 61, fill: "var(--color-status-medium)" },
  { name: "Penal", value: 68, fill: "var(--color-status-safe)" },
  { name: "Trabalho", value: 58, fill: "var(--color-status-medium)" },
  { name: "Proc.Civil", value: 55, fill: "var(--color-status-medium)" },
  { name: "Proc.Penal", value: 62, fill: "var(--color-status-medium)" },
  { name: "Admin.", value: 35, fill: "var(--color-status-critical)" },
  { name: "Tributário", value: 28, fill: "var(--color-status-critical)" },
  { name: "Ética", value: 65, fill: "var(--color-status-medium)" },
  { name: "Empresarial", value: 70, fill: "var(--color-status-safe)" },
  { name: "Dir.Humanos", value: 74, fill: "var(--color-status-safe)" },
  { name: "Ambiental", value: 38, fill: "var(--color-status-critical)" },
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
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-card-foreground">{label}</p>
        <p className="text-sm font-bold text-primary">
          {payload[0].value}% acurácia
        </p>
      </div>
    )
  }
  return null
}

function CustomLineTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-md">
        <p className="text-xs font-medium text-card-foreground">{label}</p>
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
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Bar Chart - Performance by Subject */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Desempenho por Matéria</CardTitle>
          <CardDescription>
            Porcentagem de acertos em cada disciplina
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={subjectPerformance}
                margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  content={<CustomBarTooltip />}
                  cursor={{ fill: "var(--color-muted)", opacity: 0.3 }}
                />
                <Bar
                  dataKey="value"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Line Chart - Score Evolution */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <CardTitle className="text-base">Evolução do Score</CardTitle>
          <CardDescription>
            Progresso semanal do seu score de estudo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={scoreEvolution}
                margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0.15}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-primary)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--color-border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
                  tickLine={false}
                  axisLine={false}
                  domain={[30, 100]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<CustomLineTooltip />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="var(--color-primary)"
                  strokeWidth={2.5}
                  fill="url(#scoreGradient)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    stroke: "var(--color-primary)",
                    strokeWidth: 2,
                    fill: "var(--color-card)",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Approval threshold line note */}
          <div className="mt-2 flex items-center gap-2">
            <div className="h-px w-5 bg-status-safe" />
            <span className="text-xs text-muted-foreground">
              Meta de aprovação: 50% (40 acertos de 80 questões)
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
