export function QuestionCard({question}:{question:any}){

  return(
    <div className="bg-white p-6 rounded shadow max-w-xl">
      <p className="font-semibold mb-4">
        {question.statement}
      </p>
    </div>
  )

}