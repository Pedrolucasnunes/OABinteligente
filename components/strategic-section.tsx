"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const criticalSubjects = [
  { name: "Direito Tributário", accuracy: 28, questions: 5 },
  { name: "Direito Administrativo", accuracy: 35, questions: 6 },
  { name: "Direito Ambiental", accuracy: 38, questions: 3 },
  { name: "Direito Internacional", accuracy: 40, questions: 2 },
]

const quickGains = [
  { name: "Ética Profissional", accuracy: 65, potential: "+8 pontos" },
  { name: "Direito do Consumidor", accuracy: 55, potential: "+5 pontos" },
  { name: "ECA / Idoso", accuracy: 50, potential: "+4 pontos" },
  { name: "Direito do Trabalho", accuracy: 58, potential: "+3 pontos" },
]

export function StrategicSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Critical Subjects */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-status-critical/10">
              <AlertTriangle className="size-4 text-status-critical" />
            </div>
            <div>
              <CardTitle className="text-base">Matérias Críticas</CardTitle>
              <p className="text-xs text-muted-foreground">
                Matérias com menor desempenho
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {criticalSubjects.map((subject) => (
              <div key={subject.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {subject.questions} questões
                    </span>
                    <span className="text-sm font-semibold text-status-critical">
                      {subject.accuracy}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={subject.accuracy}
                  className="h-2 bg-status-critical/10 [&>[data-slot=progress-indicator]]:bg-status-critical"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Gains */}
      <Card className="border-none shadow-sm">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-status-safe/10">
              <Zap className="size-4 text-status-safe" />
            </div>
            <div>
              <CardTitle className="text-base">Ganhos Rápidos</CardTitle>
              <p className="text-xs text-muted-foreground">
                Matérias que podem aumentar sua nota mais rápido
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            {quickGains.map((subject) => (
              <div key={subject.name} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-card-foreground">
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-status-safe/10 px-2 py-0.5 text-xs font-medium text-status-safe">
                      {subject.potential}
                    </span>
                    <span className="text-sm font-semibold text-card-foreground">
                      {subject.accuracy}%
                    </span>
                  </div>
                </div>
                <Progress
                  value={subject.accuracy}
                  className="h-2 bg-primary/10 [&>[data-slot=progress-indicator]]:bg-primary"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
