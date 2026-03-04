interface Subject {
  subject: string
  accuracy: number
}

interface Props {
  subjects: Subject[]
}

export default function CriticalSubjects({ subjects }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">

      <h2 className="font-semibold mb-4">
        Matérias Críticas
      </h2>

      <div className="space-y-4">

        {subjects.map((s, index) => (
          <div key={index}>

            <div className="flex justify-between text-sm mb-1">
              <span>{s.subject}</span>
              <span className="text-red-500">
                {s.accuracy}%
              </span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded">

              <div
                className="bg-red-500 h-2 rounded"
                style={{ width: `${s.accuracy}%` }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}