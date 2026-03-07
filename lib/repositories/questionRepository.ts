import { supabase } from "../supabase"

export async function getAllQuestions() {
  const { data, error } = await supabase
    .from("questions")
    .select("*")

  if (error) throw error

  return data
}

export async function getQuestionsBySubjects(subjectIds: string[]) {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .in("subject_id", subjectIds)

  if (error) throw error

  return data
}