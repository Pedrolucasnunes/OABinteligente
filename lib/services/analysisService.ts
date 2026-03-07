import { getUserAnswers } from "../repositories/analysisRepository"
import { runStudyAnalysis } from "../engine/studyEngine"

export async function getUserAnalysis(userId: string) {

  const answers = await getUserAnswers(userId)

  const analysis = runStudyAnalysis(answers)

  return analysis
}