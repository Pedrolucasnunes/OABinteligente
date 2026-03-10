"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts"

export function SimuladoHistoryChart({ sessions }: any) {

  const data = sessions.map((s: any, index: number) => ({
    name: `Simulado ${index + 1}`,
    score: s.correct_answers
  }))

  return (

    <div className="bg-white p-6 rounded shadow">

      <h2 className="font-bold mb-4">
        Evolução nos Simulados
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis domain={[0, 80]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  )

}