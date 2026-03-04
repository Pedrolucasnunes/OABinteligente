import { supabase } from "../supabase"

export async function calculateProjectedScore(uid: string) {

  const { data: exam } = await supabase
    .from("exams")
    .select("*")
    .eq("name", "OAB 1ª Fase")
    .single()

  if (!exam) return null

  const { data: distribution } = await supabase
    .from("exam_subject_distribution")
    .select("subject_id, question_count")
    .eq("exam_id", exam.id)

  const { data: attempts } = await supabase
    .from("attempts")
    .select("subject_id, is_correct")
    .eq("user_id", uid)

  if (!distribution || !attempts) return null

  const grouped: Record<string, { total: number; correct: number }> = {}

  attempts.forEach((a) => {

    if (!grouped[a.subject_id]) {
      grouped[a.subject_id] = { total: 0, correct: 0 }
    }

    grouped[a.subject_id].total++

    if (a.is_correct) {
      grouped[a.subject_id].correct++
    }

  })

  let projected = 0

  distribution.forEach((item) => {

    const stats = grouped[item.subject_id]

    if (stats && stats.total > 0) {

      const performance = stats.correct / stats.total

      projected += performance * item.question_count

    }

  })

  const rounded = Number(projected.toFixed(1))
  const missing = exam.passing_score - rounded

  return {
    projectedScore: rounded,
    missingPoints: missing > 0 ? Number(missing.toFixed(1)) : 0
  }

}