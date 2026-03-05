'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props} 
      attribute="class" 
      defaultTheme="light" // Garante que comece no modo claro
      enableSystem={false} // Evita que o sistema do usuário force o modo escuro
    >
      {children}
    </NextThemesProvider>
  )
}