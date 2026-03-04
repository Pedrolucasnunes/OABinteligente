interface ScoreCardProps {
  title: string
  value: string
  subtitle?: string
}

export default function ScoreCard({ title, value, subtitle }: ScoreCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">

      <h3 className="text-sm text-gray-500">
        {title}
      </h3>

      <div className="text-3xl font-bold mt-2">
        {value}
      </div>

      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">
          {subtitle}
        </p>
      )}

    </div>
  )
}