"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Status = "Crítico" | "Médio" | "Seguro"

interface SubjectRow {
  subject: string
  accuracy: number
  weight: number
  status: Status
}

const priorityData: SubjectRow[] = [
  { subject: "Direito Constitucional", accuracy: 72, weight: 6, status: "Seguro" },
  { subject: "Direito Civil", accuracy: 61, weight: 7, status: "Médio" },
  { subject: "Direito Penal", accuracy: 68, weight: 6, status: "Seguro" },
  { subject: "Direito do Trabalho", accuracy: 58, weight: 5, status: "Médio" },
  { subject: "Direito Processual Civil", accuracy: 55, weight: 6, status: "Médio" },
  { subject: "Direito Processual Penal", accuracy: 62, weight: 5, status: "Médio" },
  { subject: "Direito Administrativo", accuracy: 35, weight: 6, status: "Crítico" },
  { subject: "Direito Tributário", accuracy: 28, weight: 5, status: "Crítico" },
  { subject: "Ética Profissional", accuracy: 65, weight: 8, status: "Médio" },
  { subject: "Direito Empresarial", accuracy: 70, weight: 5, status: "Seguro" },
  { subject: "Direitos Humanos", accuracy: 74, weight: 4, status: "Seguro" },
  { subject: "Direito Ambiental", accuracy: 38, weight: 3, status: "Crítico" },
  { subject: "Direito do Consumidor", accuracy: 55, weight: 3, status: "Médio" },
  { subject: "ECA / Idoso", accuracy: 50, weight: 3, status: "Médio" },
  { subject: "Direito Internacional", accuracy: 40, weight: 2, status: "Crítico" },
]

// Mapeamento usando as variáveis do seu globals.css
const statusConfig: Record<Status, { className: string; barClass: string }> = {
  Crítico: {
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    barClass: "bg-chart-3",
  },
  Médio: {
    className: "bg-chart-4/10 text-chart-4 border-chart-4/20",
    barClass: "bg-chart-4",
  },
  Seguro: {
    className: "bg-chart-1/10 text-chart-1 border-chart-1/20",
    barClass: "bg-chart-1",
  },
}

export function PriorityTable() {
  return (
    <Card className="border border-border/40 bg-card shadow-sm">
      <CardHeader className="px-6 py-5">
        <CardTitle className="text-lg font-bold text-foreground/90">Mapa de Prioridades</CardTitle>
        <CardDescription className="text-xs font-medium">
          Visão completa das disciplinas por <span className="text-primary/80 font-semibold">relevância e acerto</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 sm:px-6">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground/70">Matéria</TableHead>
              <TableHead className="text-right text-[11px] uppercase tracking-wider font-bold text-muted-foreground/70">Acurácia</TableHead>
              <TableHead className="text-center text-[11px] uppercase tracking-wider font-bold text-muted-foreground/70">Questões</TableHead>
              <TableHead className="text-center text-[11px] uppercase tracking-wider font-bold text-muted-foreground/70">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priorityData.map((row) => (
              <TableRow key={row.subject} className="border-border/40 hover:bg-muted/30 transition-colors">
                <TableCell className="py-4 font-semibold text-sm text-foreground/80">
                  {row.subject}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-3">
                    <div className="hidden h-2 w-20 overflow-hidden rounded-full bg-muted/50 sm:block">
                      <div
                        className={cn("h-full rounded-full transition-all duration-500", statusConfig[row.status].barClass)}
                        style={{ width: `${row.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold tabular-nums text-foreground">
                      {row.accuracy}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center justify-center size-7 rounded-lg bg-muted/40 text-xs font-bold text-muted-foreground">
                    {row.weight}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-tight rounded-md",
                      statusConfig[row.status].className
                    )}
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}