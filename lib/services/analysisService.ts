import { getUserAttempts } from "../repositories/attemptRepository"
import { runStudyEngine } from "../engine/studyEngine"

export async function getUserAnalysis(userId: string) {

  const attempts = await getUserAttempts(userId)

  if (!attempts) return null

  const analysis = runStudyEngine(userId)

  return analysis
}