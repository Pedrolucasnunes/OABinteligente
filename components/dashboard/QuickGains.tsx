interface Gain {
  subject: string
  gain: number
  currentAccuracy: number
}

interface Props {
  gains: Gain[]
}

export default function QuickGains({ gains }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">

      <h2 className="font-semibold mb-4">
        Ganhos Rápidos
      </h2>

      <div className="space-y-4">

        {gains.map((g, index) => (
          <div key={index} className="flex justify-between">

            <div>
              <p className="font-medium">{g.subject}</p>
              <p className="text-sm text-gray-500">
                Acerto atual: {g.currentAccuracy}%
              </p>
            </div>

            <div className="text-green-600 font-semibold">
              +{g.gain} pts
            </div>

          </div>
        ))}

      </div>

    </div>
  )
}