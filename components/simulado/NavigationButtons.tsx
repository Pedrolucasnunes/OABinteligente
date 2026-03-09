export function NavigationButtons({ currentIndex, setCurrentIndex, nextQuestion, setFinished }: any) {

  return (

    <div className="flex gap-3 mt-6">

      <button
        onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Anterior
      </button>

      <button
        onClick={nextQuestion}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Próxima
      </button>

      <button
        onClick={() => setFinished(true)}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Finalizar
      </button>

    </div>

  )

}