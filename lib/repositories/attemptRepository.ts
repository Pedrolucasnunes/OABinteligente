import { supabase } from "../supabase"

export async function getUserAttempts(userId: string) {
  const { data, error } = await supabase
    .from("attempts")
    .select("*")
    .eq("user_id", userId)

  if (error) throw error

  return data
}

export async function insertAttempt(attempt: any) {
  const { error } = await supabase
    .from("attempts")
    .insert([attempt])

  if (error) throw error
}