"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-30 bg-background/60 backdrop-blur-md border-b border-border/40">
      <div className="flex items-center justify-between px-6 py-4 lg:px-10">

        {/* LEFT - Títulos com hierarquia clara */}
        <div className="pl-12 lg:pl-0">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground/90">
            Dashboard
          </h2>
          <p className="text-xs font-medium text-muted-foreground/80">
            Acompanhe seu progresso para a <span className="text-primary/80">OAB 1ª Fase</span>
          </p>
        </div>

        {/* RIGHT - Elementos com cores de destaque suaves */}
        <div className="flex items-center gap-4">

          {/* SEARCH - Ajustado para o estilo "pílula" suave */}
          <div className="hidden items-center gap-2 rounded-full border border-border/60 bg-white/50 px-4 py-1.5 transition-all focus-within:border-primary/40 focus-within:ring-2 focus-within:ring-primary/10 md:flex">
            <Search className="size-4 text-muted-foreground/70" />
            <Input
              placeholder="Buscar matéria..."
              className="h-auto w-48 border-none bg-transparent p-0 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-0"
            />
          </div>

          {/* NOTIFICATIONS - Ponto de destaque colorido */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-full hover:bg-white shadow-sm transition-all"
            aria-label="Notificações"
          >
            <Bell className="size-5 text-foreground/70" />

            {/* O "Badge" de notificação usando a cor primária vibrante */}
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white ring-2 ring-background">
              3
            </span>
          </Button>

        </div>
      </div>
    </header>
  )
}