import { fetchAnalysisData } from "../repositories/analysisRepository"
import { StudyAnalysis } from "../types/studyAnalysis"

export async function runStudyEngine(uid: string): Promise<StudyAnalysis | null> {

  const data = await fetchAnalysisData(uid)

  if (!data) return null

  const { exam, distribution, attempts } = data

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
  let weightedTotal = 0
  let weightedScore = 0

  const criticalSubjects: any[] = []
  const priorityMap: any[] = []
  const improvementSimulations: any[] = []
  const strategicSimulations: any[] = []

  distribution.forEach((item) => {

    const stats = grouped[item.subject_id]

    if (!stats || stats.total === 0) return

    const rawPerformance = stats.correct / stats.total
    const confidenceFactor = Math.min(stats.total / 20, 1)

    const performance =
      rawPerformance * confidenceFactor +
      0.5 * (1 - confidenceFactor)

    projected += performance * item.question_count

    weightedTotal += item.question_count
    weightedScore += performance * item.question_count

    const errorRate = 1 - performance
    const impact = item.question_count * errorRate

    criticalSubjects.push({
      subject_id: item.subject_id,
      performance: Number((performance * 100).toFixed(1)),
      impact
    })

    let status = "Seguro"
    let color = "green"

    if (performance * 100 < 40) {
      status = "Crítico"
      color = "red"
    } else if (performance * 100 < 65) {
      status = "Médio"
      color = "yellow"
    }

    priorityMap.push({
      subject_id: item.subject_id,
      performance: Number((performance * 100).toFixed(1)),
      weight: item.question_count,
      status,
      color
    })

    const simulatedPerformance = Math.max(performance + 0.2, 0.7)

    const gain =
      (simulatedPerformance * item.question_count) -
      (performance * item.question_count)

    if (gain > 0.5) {
      improvementSimulations.push({
        subject_id: item.subject_id,
        gain: Number(gain.toFixed(1))
      })
    }

    const strategicGain = impact * 0.4

    strategicSimulations.push({
      subject_id: item.subject_id,
      gain: Number(strategicGain.toFixed(1))
    })

  })

  criticalSubjects.sort((a, b) => b.impact - a.impact)
  priorityMap.sort((a, b) => b.weight - a.weight)
  improvementSimulations.sort((a, b) => b.gain - a.gain)
  strategicSimulations.sort((a, b) => b.gain - a.gain)

  const rounded = Number(projected.toFixed(1))
  const missing = exam.passing_score - rounded

  const studyScore = Number(((weightedScore / weightedTotal) * 100).toFixed(1))

  const result: StudyAnalysis = {

    projectedScore: rounded,

    missingPoints: missing > 0 ? Number(missing.toFixed(1)) : 0,

    criticalSubjects: criticalSubjects.slice(0, 5),

    priorityMap,

    improvementSimulations: improvementSimulations.slice(0, 5),

    strategicSimulations: strategicSimulations.slice(0, 3),

    studyScore
  }

  return result
}