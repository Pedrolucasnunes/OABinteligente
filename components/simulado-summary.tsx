"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  total: number
  bestScore: number
  lastScore: number
}

export function SimuladoSummary({ total, bestScore, lastScore }: Props) {

  if (total === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Simulados</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          Você ainda não realizou simulados.
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>

      <CardHeader>
        <CardTitle>Simulados</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">

        <div className="flex justify-between">
          <span>Último simulado</span>
          <strong>{lastScore}/80</strong>
        </div>

        <div className="flex justify-between">
          <span>Melhor resultado</span>
          <strong>{bestScore}/80</strong>
        </div>

        <div className="flex justify-between">
          <span>Total realizados</span>
          <strong>{total}</strong>
        </div>

      </CardContent>

    </Card>
  )
}