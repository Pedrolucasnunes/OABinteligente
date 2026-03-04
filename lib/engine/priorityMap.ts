import { supabase } from "../supabase"

export async function calculatePriorityMap(uid: string) {

  const { data: exam } = await supabase
    .from("exams")
    .select("id")
    .eq("name", "OAB 1ª Fase")
    .single()

  if (!exam) return []

  const { data: distribution } = await supabase
    .from("exam_subject_distribution")
    .select("subject_id, question_count")
    .eq("exam_id", exam.id)

  const { data: attempts } = await supabase
    .from("attempts")
    .select("subject_id, is_correct")
    .eq("user_id", uid)

  if (!distribution || !attempts) return []

  const grouped: Record<string, { total: number; correct: number }> = {}

  attempts.forEach((a) => {
    if (!grouped[a.subject_id]) {
      grouped[a.subject_id] = { total: 0, correct: 0 }
    }

    grouped[a.subject_id].total++
    if (a.is_correct) grouped[a.subject_id].correct++
  })

  const priorities = distribution.map((item) => {

    const stats = grouped[item.subject_id]

    const performance =
      stats && stats.total > 0
        ? (stats.correct / stats.total) * 100
        : 0

    let status = "Seguro"
    let color = "green"

    if (performance < 40) {
      status = "Crítico"
      color = "red"
    } else if (performance < 65) {
      status = "Médio"
      color = "yellow"
    }

    return {
      subject_id: item.subject_id,
      performance: performance.toFixed(1),
      weight: item.question_count,
      status,
      color,
    }
  })

  priorities.sort((a, b) => b.weight - a.weight)

  return priorities
}