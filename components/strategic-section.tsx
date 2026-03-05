"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Zap } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

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
    <div className="grid gap-6 lg:grid-cols-2">

      {/* MATÉRIAS CRÍTICAS - Foco em Alerta (Vermelho) */}
      <Card className="border border-border/40 bg-card shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-chart-3/10 shadow-sm">
              <AlertTriangle className="size-5 text-chart-3" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Matérias Críticas</CardTitle>
              <p className="text-xs font-medium text-muted-foreground/70">
                Menor desempenho: foco total em revisão
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {criticalSubjects.map((subject) => (
              <div key={subject.name} className="group flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
                      {subject.questions} questões
                    </span>
                    <span className="text-sm font-black text-chart-3">
                      {subject.accuracy}%
                    </span>
                  </div>
                </div>
                {/* Custom Progress para garantir a cor vibrante */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-chart-3/10">
                  <div 
                    className="h-full rounded-full bg-chart-3 transition-all duration-1000 ease-out"
                    style={{ width: `${subject.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* GANHOS RÁPIDOS - Foco em Impulso (Azul/Verde conforme Imagem 2) */}
      <Card className="border border-border/40 bg-card shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 shadow-sm">
              <Zap className="size-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base font-bold">Ganhos Rápidos</CardTitle>
              <p className="text-xs font-medium text-muted-foreground/70">
                Oportunidades para subir seu score agora
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-6">
            {quickGains.map((subject) => (
              <div key={subject.name} className="group flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                    {subject.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="rounded-md bg-chart-1/10 px-2 py-0.5 text-[10px] font-extrabold tracking-tighter text-chart-1 border border-chart-1/20">
                      {subject.potential}
                    </span>
                    <span className="text-sm font-black text-foreground">
                      {subject.accuracy}%
                    </span>
                  </div>
                </div>
                {/* Usando a Cor Primária para o "impulso" da Imagem 2 */}
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-primary/10">
                  <div 
                    className="h-full rounded-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${subject.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

    </div>
  )
}