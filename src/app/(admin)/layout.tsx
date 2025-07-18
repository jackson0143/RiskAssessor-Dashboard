"use client"

import { SidebarProvider, useSidebar, SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

// Temporary mobile sidebar trigger solution
function MobileSidebarTrigger() {
  const { isMobile } = useSidebar()
  
  if (!isMobile) {
    return null
  }
 
  return <SidebarTrigger />
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <MobileSidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
} 