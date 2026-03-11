"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StudyAnalysis } from "@/lib/types/studyAnalysis"

interface Props {
  analysis: StudyAnalysis
}

export function RecoverablePoints({ analysis }: Props) {

  const recoverable = analysis.priorityMap.reduce((total: number, subject: any) => {

    const performance = subject.performance / 100
    const weight = subject.weight

    const lost = weight * (1 - performance)

    return total + lost

  }, 0)

  const rounded = recoverable.toFixed(1)

  return (
    <Card>

      <CardHeader>
        <CardTitle>Pontos Recuperáveis</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">

        <p className="text-3xl font-bold">
          {rounded}
        </p>

        <p className="text-sm text-muted-foreground">
          pontos que você está deixando na prova hoje.
        </p>

        <p className="text-xs text-muted-foreground">
          Melhorando suas matérias críticas você pode recuperar esses pontos.
        </p>

      </CardContent>

    </Card>
  )
}