import { getUserAttempts } from "../repositories/attemptRepository"
import { runStudyEngine } from "../engine/studyEngine"
import { calculateConfidence, calculateApprovalProbability } from "../utils"

export async function getUserAnalysis(userId: string) {

  const attempts = await getUserAttempts(userId)

  if (!attempts) return null

  const engine = await runStudyEngine(userId)

  if (!engine) return null

  const totalAttempts = attempts.length
  const correct = attempts.filter(a => a.is_correct).length

  const accuracy = totalAttempts > 0
    ? (correct / totalAttempts) * 100
    : 0

  const confidenceIndex = calculateConfidence(totalAttempts)

  const approvalProbability = calculateApprovalProbability(
    engine.projectedScore,
    confidenceIndex
  )

  return {

    ...engine,

    totalAttempts,
    accuracy: Number(accuracy.toFixed(1)),
    confidenceIndex,
    approvalProbability
  }
}