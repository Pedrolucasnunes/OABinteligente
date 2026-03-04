"use client"

import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-black text-white p-6">

        <h1 className="text-xl font-bold mb-8">
          OABinteligente
        </h1>

        <nav className="flex flex-col gap-4">

          <Link href="/dashboard">Dashboard</Link>

          <Link href="/questions">Questões</Link>

          <Link href="/simulado">Simulados</Link>

          <Link href="/study-plan">Plano de estudo</Link>

          <Link href="/simulator">Simulador</Link>

          <Link href="/stats">Estatísticas</Link>

        </nav>

      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-gray-100 p-10">
        {children}
      </main>

    </div>
  )
}