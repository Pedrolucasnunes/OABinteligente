export function ProgressBar({ answered, total }: any) {

  const progress = (answered / total) * 100

  return (

    <div className="mb-6 max-w-xl">

      <div className="w-full bg-gray-300 rounded h-2">

        <div
          className="bg-blue-600 h-2 rounded"
          style={{ width: `${progress}%` }}
        />

      </div>

      <p className="text-sm mt-2">
        {answered} de {total} respondidas
      </p>

    </div>

  )

}