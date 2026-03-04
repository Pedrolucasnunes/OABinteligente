"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

interface Data {
  week: string
  score: number
}

interface Props {
  data: Data[]
}

export default function ScoreEvolution({ data }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">

      <h2 className="font-semibold mb-4">
        Evolução do Score
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="week" />

          <YAxis domain={[0, 100]} />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#16a34a"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  )
}