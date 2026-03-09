export function QuestionGrid({ questions, answers, currentIndex, setCurrentIndex }: any) {

  return (

    <div className="grid grid-cols-10 gap-2 mb-6 max-w-xl">

      {questions.map((q: any, index: number) => {

        const answered = answers[q.id]

        return (

          <button
            key={q.id}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-8 h-8 rounded text-sm font-semibold
              ${answered ? "bg-blue-600 text-white" : "bg-gray-200"}
              ${index === currentIndex ? "ring-2 ring-black" : ""}
            `}
          >
            {index + 1}
          </button>

        )

      })}

    </div>

  )

}