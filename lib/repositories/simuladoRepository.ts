import { supabase } from "@/lib/supabase"

export async function generateSimulado(examId: string) {

  const { data: distribution } = await supabase
    .from("exam_subject_distribution")
    .select("*")
    .eq("exam_id", examId)

  if (!distribution) return []

  let questions: any[] = []

  for (const item of distribution) {

    const { data } = await supabase
      .from("questions")
      .select("*")
      .eq("subject_id", item.subject_id)
      .limit(item.question_count)

    if (data) {
      questions.push(...data)
    }

  }

  return questions
}