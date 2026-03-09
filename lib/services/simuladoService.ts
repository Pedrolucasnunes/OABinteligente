import { supabase } from "@/lib/supabase"

export async function createExamSession(userId: string) {

  const { data, error } = await supabase
    .from("exam_sessions")
    .insert({
      user_id: userId,
      total_questions: 80
    })
    .select()
    .single()

  if (error) throw error

  return data
}