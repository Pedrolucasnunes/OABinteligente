import { supabase } from "../lib/supabase"

export default async function Home() {
  const { data: subjects, error } = await supabase
    .from("subjects")
    .select("*")

  if (error) {
    console.error(error)
  }

  return (
    <main className="min-h-screen bg-gray-50 p-10">
      <h1 className="text-3xl font-bold mb-6">
        OABinteligente
      </h1>

      <h2 className="text-xl font-semibold mb-4">
        Matérias disponíveis:
      </h2>

      <ul className="space-y-2">
        {subjects?.map((subject) => (
          <li
            key={subject.id}
            className="bg-white p-4 rounded shadow"
          >
            {subject.name}
          </li>
        ))}
      </ul>
    </main>
  )
}