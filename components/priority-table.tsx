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

const statusConfig: Record<
  Status,
  { className: string }
> = {
  Crítico: {
    className: "bg-status-critical/10 text-status-critical border-status-critical/20",
  },
  Médio: {
    className: "bg-status-medium/10 text-status-medium border-status-medium/20",
  },
  Seguro: {
    className: "bg-status-safe/10 text-status-safe border-status-safe/20",
  },
}

export function PriorityTable() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">Mapa de Prioridades</CardTitle>
        <CardDescription>
          Visão completa de todas as matérias com acurácia, peso e status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground">Matéria</TableHead>
              <TableHead className="text-right text-muted-foreground">
                Acurácia
              </TableHead>
              <TableHead className="text-center text-muted-foreground">
                Peso (questões)
              </TableHead>
              <TableHead className="text-center text-muted-foreground">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {priorityData.map((row) => (
              <TableRow key={row.subject}>
                <TableCell className="font-medium text-card-foreground">
                  {row.subject}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-muted sm:block">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          row.status === "Crítico"
                            ? "bg-status-critical"
                            : row.status === "Médio"
                            ? "bg-status-medium"
                            : "bg-status-safe"
                        )}
                        style={{ width: `${row.accuracy}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold tabular-nums text-card-foreground">
                      {row.accuracy}%
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm text-muted-foreground font-mono">
                    {row.weight}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium",
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
