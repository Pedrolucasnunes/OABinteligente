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
                Menor desempenho: foco total em revisão
              </p>
            </div>

          </div>

        </CardHeader>

        <CardContent>

          <div className="flex flex-col gap-6">

            {criticalSubjects.map((subject: any, index: number) => {

              const subjectName =
                subjectsMap[subject.subject_id] || "Matéria"

              return (

                <div key={index} className="group flex flex-col gap-2">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-foreground/80">
                      {subjectName}
                    </span>

                    <div className="flex items-center gap-3">

                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
                        {subject.weight || 0} questões
                      </span>

                      <span className="text-sm font-black text-chart-3">
                        {subject.performance}%
                      </span>

                    </div>

                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-chart-3/10">

                    <div
                      className="h-full rounded-full bg-chart-3 transition-all duration-1000 ease-out"
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
                Oportunidades para subir seu score agora
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

                <div key={index} className="group flex flex-col gap-2">

                  <div className="flex items-center justify-between">

                    <span className="text-sm font-bold text-foreground/80">
                      {subjectName}
                    </span>

                    <div className="flex items-center gap-3">

                      <span className="rounded-md bg-chart-1/10 px-2 py-0.5 text-[10px] font-extrabold tracking-tighter text-chart-1 border border-chart-1/20">
                        +{subject.gain} pontos
                      </span>

                      <span className="text-sm font-black text-foreground">
                        {subject.performance || 0}%
                      </span>

                    </div>

                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary/10">

                    <div
                      className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                      style={{ width: `${subject.performance || 0}%` }}
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