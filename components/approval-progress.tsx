"use client"

import { Card, CardContent } from "@/components/ui/card"
import { StudyAnalysis } from "@/lib/types/studyAnalysis"

interface Props {
  analysis: StudyAnalysis
}

export function ApprovalProgress({ analysis }: Props) {

  const projected = analysis.projectedScore || 0
  const passingScore = 40

  const progress = Math.min((projected / passingScore) * 100, 100)
  const missing = Math.max(passingScore - projected, 0)

  return (

    <Card className="border border-border/40 bg-card shadow-sm h-full">

      <CardContent className="p-6">

        <div className="flex items-center justify-between mb-4">

          <div>

            <p className="text-sm text-muted-foreground">
              Aprovação na OAB
            </p>

            <p className="text-2xl font-bold">
              {projected} / {passingScore}
            </p>

          </div>

          <div className="text-right">

            {missing > 0 ? (

              <p className="text-sm font-medium text-muted-foreground">
                Faltam <span className="font-bold text-foreground">
                  {missing.toFixed(1)}
                </span> pontos
              </p>

            ) : (

              <p className="text-sm font-bold text-green-600">
                Aprovado 🎉
              </p>

            )}

          </div>

        </div>

        <div className="h-3 w-full rounded-full bg-muted overflow-hidden">

          <div
            className="h-full bg-primary transition-all duration-700"
            style={{ width: `${progress}%` }}
          />

        </div>

      </CardContent>

    </Card>

  )
}