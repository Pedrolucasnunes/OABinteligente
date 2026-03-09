export function AnswerOptions({ question, answers, handleAnswer }: any) {

  return (

    <div className="space-y-3">

      {["A","B","C","D"].map((letter) => {

        const selected = answers[question.id] === letter

        return (

          <button
            key={letter}
            onClick={() => handleAnswer(letter)}
            className={`
              w-full text-left p-3 border rounded
              ${selected ? "bg-blue-100 border-blue-500" : "hover:bg-gray-100"}
            `}
          >
            {letter}) {question[`option_${letter.toLowerCase()}`]}
          </button>

        )

      })}

    </div>

  )

}