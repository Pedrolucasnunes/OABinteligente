import { supabase } from "../supabase"

export async function calculateCriticalSubjects(uid: string) {

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

    if (a.is_correct) {
      grouped[a.subject_id].correct++
    }

  })

  const riskList: any[] = []

  distribution.forEach((item) => {

    const stats = grouped[item.subject_id]

    if (stats && stats.total > 0) {

      const performance = stats.correct / stats.total
      const errorRate = 1 - performance
      const impact = item.question_count * errorRate

      riskList.push({
        subject_id: item.subject_id,
        performance: (performance * 100).toFixed(1),
        impact
      })

    }

  })

  riskList.sort((a, b) => b.impact - a.impact)

  return riskList.slice(0, 3)
}