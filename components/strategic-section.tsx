"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Zap } from "lucide-react"
import { StudyAnalysis } from "@/lib/types/studyAnalysis"

interface Props {
  analysis: StudyAnalysis
  subjectsMap: Record<string, string>
}

export function StrategicSection({ analysis, subjectsMap }: Props) {

  const criticalSubjects = analysis.criticalSubjects || []
  const quickGains = analysis.improvementSimulations || []

  if (analysis.priorityMap.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground">
          Resolva mais algumas questões para gerar recomendações estratégicas de estudo.
        </p>
      </Card>
    )
  }

  return (

    <div className="grid gap-6 lg:grid-cols-2">

      {/* MATÉRIAS CRÍTICAS */}

      <Card className="border border-border/40 bg-card shadow-sm">

        <CardHeader className="pb-4">

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-xl bg-chart-3/10 shadow-sm">
              <AlertTriangle className="size-5 text-chart-3" />
            </div>

            <div>
              <CardTitle className="text-base font-bold">
                Matérias Críticas
              </CardTitle>

              <p className="text-xs font-medium text-muted-foreground/70">
                Onde você mais perde pontos na prova
              </p>
            </div>

          </div>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col gap-6 max-h-[280px] overflow-y-auto pr-2">

            {criticalSubjects.map((subject: any, index: number) => {

              const subjectName =
                subjectsMap[subject.subject_id] || "Matéria"

              return (

                <div key={index} className="flex flex-col gap-2">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-foreground/80">
                      {subjectName}
                    </span>

                    <span className="text-xs font-bold text-muted-foreground">
                      impacto: {Math.round(subject.impact)}
                    </span>

                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-chart-3/10">

                    <div
                      className="h-full rounded-full bg-chart-3 transition-all duration-700"
                      style={{ width: `${subject.performance}%` }}
                    />

                  </div>

                </div>

              )

            })}

          </div>

        </CardContent>

      </Card>

      {/* GANHOS RÁPIDOS */}

      <Card className="border border-border/40 bg-card shadow-sm">

        <CardHeader className="pb-4">

          <div className="flex items-center gap-3">

            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 shadow-sm">
              <Zap className="size-5 text-primary" />
            </div>

            <div>
              <CardTitle className="text-base font-bold">
                Ganhos Rápidos
              </CardTitle>

              <p className="text-xs font-medium text-muted-foreground/70">
                Onde você pode ganhar pontos rapidamente
              </p>
            </div>

          </div>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col gap-6">

            {quickGains.map((subject: any, index: number) => {

              const subjectName =
                subjectsMap[subject.subject_id] || "Matéria"

              return (

                <div key={index} className="flex flex-col gap-2">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-foreground/80">
                      {subjectName}
                    </span>

                    <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary border border-primary/20">
                      +{subject.gain} pontos possíveis
                    </span>

                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary/10">

                    <div
                      className="h-full rounded-full bg-primary transition-all duration-700"
                      style={{ width: `${Math.min(subject.gain * 20, 100)}%` }}
                    />

                  </div>

                </div>

              )

            })}

          </div>

        </CardContent>

      </Card>

    </div>

  )
}