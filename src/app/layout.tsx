"use client"

import { SidebarProvider, useSidebar, SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Temporary mobile sidebar trigger solution
function MobileSidebarTrigger() {
  const { isMobile } = useSidebar()
  
  if (!isMobile) {
    return null
  }
  
  return <SidebarTrigger />
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
            attribute="class"
            //defaultTheme="system"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <MobileSidebarTrigger />
            {children}
          </SidebarInset>
        </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}