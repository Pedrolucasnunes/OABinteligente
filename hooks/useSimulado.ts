import { useState } from "react"

export function useSimulado(questions:any[]) {

  const [currentIndex,setCurrentIndex] = useState(0)
  const [answers,setAnswers] = useState<Record<string,string>>({})

  function handleAnswer(questionId:string,option:string){
    setAnswers(prev=>({
      ...prev,
      [questionId]:option
    }))
  }

  function next(){
    setCurrentIndex(i=>Math.min(i+1,questions.length-1))
  }

  function prev(){
    setCurrentIndex(i=>Math.max(i-1,0))
  }

  return{
    currentIndex,
    answers,
    handleAnswer,
    next,
    prev
  }

}