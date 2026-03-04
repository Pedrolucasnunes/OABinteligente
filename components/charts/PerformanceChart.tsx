"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

interface Data {
  subject: string
  accuracy: number
}

interface Props {
  data: Data[]
}

export default function PerformanceChart({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">

      <h2 className="font-semibold mb-4">
        Desempenho por Matéria
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="subject" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Bar dataKey="accuracy" fill="#2563eb" />

        </BarChart>

      </ResponsiveContainer>

    </div>
  )
}