export interface StudyAnalysis {

  projectedScore: number
  missingPoints: number

  criticalSubjects: {
    subject_id: string
    performance: string
    impact: number
  }[]

  priorityMap: {
    subject_id: string
    performance: string
    weight: number
    status: string
    color: string
  }[]

  improvementSimulations: {
    subject_id: string
    gain: string
  }[]

  strategicSimulations: {
    subject_id: string
    gain: string
  }[]

}