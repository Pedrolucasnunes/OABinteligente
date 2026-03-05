"use client"

import { Bell, Search } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-4 lg:px-8">
        {/* Left: Title */}
        <div className="pl-10 lg:pl-0">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Dashboard
          </h2>
          <p className="text-sm text-muted-foreground">
            Acompanhe seu progresso para a OAB 1ª Fase
          </p>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-lg bg-card px-3 py-2 shadow-sm md:flex">
            <Search className="size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar matéria..."
              className="w-40 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* Notifications */}
          <button
            className="relative flex size-10 items-center justify-center rounded-lg bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground"
            aria-label="Notificações"
          >
            <Bell className="size-[18px]" />
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
