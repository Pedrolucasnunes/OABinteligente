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
        className="fixed top-4 left-4 z-50 flex items-center justify-center rounded-lg bg-sidebar p-2 text-sidebar-foreground lg:hidden"
        aria-label="Abrir menu"
      >
        <Menu className="size-5" />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/30 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close button on mobile */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-sidebar-foreground/60 hover:text-sidebar-foreground lg:hidden"
          aria-label="Fechar menu"
        >
          <X className="size-5" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-8">
          <div className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <GraduationCap className="size-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-sidebar-foreground">
              OAB
              <span className="text-sidebar-primary">inteligente</span>
            </h1>
            <p className="text-xs text-sidebar-foreground/50">1ª Fase</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    item.active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="size-[18px]" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom section */}
        <div className="border-t border-sidebar-border px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
              MR
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">
                Maria Rodrigues
              </p>
              <p className="text-xs text-sidebar-foreground/50">Plano Pro</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
