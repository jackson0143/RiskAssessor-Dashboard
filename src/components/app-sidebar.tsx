import {  Home,  Search, Settings } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,

} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
 

  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Add vendor",
    url: "/vendors",
    icon: Settings,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },


]

export function AppSidebar() {
  return (
    <Sidebar collapsible="none" className="h-auto">





      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Allnex Risk Assessor</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="ml-auto">
        <ModeToggle  />
      </SidebarFooter>
    </Sidebar>
  )
}