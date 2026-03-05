"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  FileQuestion,
  ClipboardList,
  BookOpen,
  Target,
  BarChart3,
  UserCircle,
  GraduationCap,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Questões", icon: FileQuestion, active: false },
  { label: "Simulados", icon: ClipboardList, active: false },
  { label: "Plano de Estudo", icon: BookOpen, active: false },
  { label: "Simulador de Aprovação", icon: Target, active: false },
  { label: "Estatísticas", icon: BarChart3, active: false },
  { label: "Perfil", icon: UserCircle, active: false },
]

export function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-lg bg-[#020817] p-2 text-white lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="size-5" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          // Forçamos o fundo escuro (Navy Blue) da Imagem 2
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#020817] text-slate-200 transition-transform duration-300 lg:static lg:translate-x-0 border-r border-slate-800",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="size-5" />
        </button>

        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-10">
          <div className="flex size-10 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-900/20">
            <GraduationCap className="size-6 text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-white">OAB</span>
              <span className="text-blue-500">inteligente</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-500">1ª Fase</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4">
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    item.active
                      ? "bg-blue-600/10 text-blue-400 ring-1 ring-inset ring-blue-500/20"
                      : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"
                  )}
                >
                  <item.icon className={cn("size-5", item.active ? "text-blue-400" : "text-slate-500")} />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User section */}
        <div className="mt-auto border-t border-slate-800 p-4">
          <div className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-800/50 cursor-pointer">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-bold text-blue-400 border border-blue-500/20">
              MR
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-200">
                Maria Rodrigues
              </p>
              <p className="text-xs text-slate-500 font-medium italic">Plano Pro</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}