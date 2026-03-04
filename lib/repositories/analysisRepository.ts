import { supabase } from "../supabase"

export async function fetchAnalysisData(uid: string) {

  const { data: exam } = await supabase
    .from("exams")
    .select("*")
    .eq("name", "OAB 1ª Fase")
    .single()

  if (!exam) {
    return null
  }

  const { data: distribution } = await supabase
    .from("exam_subject_distribution")
    .select("subject_id, question_count")
    .eq("exam_id", exam.id)

  const { data: attempts } = await supabase
    .from("attempts")
    .select("subject_id, is_correct")
    .eq("user_id", uid)

  if (!distribution || !attempts) {
    return null
  }

  return {
    exam,
    distribution,
    attempts
  }

}