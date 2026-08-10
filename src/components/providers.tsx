'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'

export function OmniaProviders({ children }: { children: React.ReactNode }) {
 const [queryClient] = useState(
 () =>
 new QueryClient({
 defaultOptions: {
 queries: {
 staleTime: 2500,
 retry: 2,
 refetchOnWindowFocus: true,
 },
 },
 })
 )

 return (
 <ThemeProvider
 attribute="class"
 defaultTheme="dim"
 enableSystem={false}
 // Order matters: light → dim → dark when cycling.
 themes={['light', 'dim', 'dark']}
 disableTransitionOnChange
 // We define `.dim` and `.dark` ourselves; `next-themes` writes the
 // class on <html>, and globals.css handles the rest.
 >
 <QueryClientProvider client={queryClient}>
 {children}
 </QueryClientProvider>
 </ThemeProvider>
 )
}
