export interface StudyAnalysis {

  studyScore: number
  projectedScore: number
  missingPoints: number
  approvalProbability: number

  criticalSubjects: {
    subject_id: string
    performance: number
    impact: number
  }[]

  priorityMap: {
    subject_id: string
    performance: number
    weight: number
    status: string
    color: string
  }[]

  improvementSimulations: {
    subject_id: string
    gain: number
  }[]

  strategicSimulations: {
    subject_id: string
    gain: number
  }[]

}