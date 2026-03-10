import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateConfidence(totalQuestions: number) {

  const k = 0.01

  const confidence = 1 - Math.exp(-k * totalQuestions)

  return Number((confidence * 100).toFixed(1))
}

export function calculateApprovalProbability(
  score: number,
  confidence: number
) {

  const a = 0.35

  const logistic = 1 / (1 + Math.exp(-a * (score - 40)))

  const adjusted = logistic * (confidence / 100)

  return Number((adjusted * 100).toFixed(1))
}