import { Home, HousePlus, Users} from "lucide-react";
import { usePathname } from "next/navigation";

import { ModeToggle } from "@/components/mode-toggle";
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

  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";


const items = [
  {
    title: "Home",
    url: "/admin/home",
    icon: Home,
  },
  {
    title: "Vendors",
    url: "/admin/vendors",
    icon: Users,
  },
];

const items2 = [
  {
    title: "Questions",
    url: "/admin/questions",
    icon: HousePlus,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  
  return (
    <Sidebar collapsible="offcanvas" className="h-auto">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold text-[#1a1a1a]">
                  Allnex Risk Assessor
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator className="-mx-0" />

      <SidebarContent>
        {/* Section 1 */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={pathname === item.url}
                    >
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
            

            {/* Section 2 */}
        <SidebarGroup>
          <SidebarGroupLabel>Form</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items2.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={pathname === item.url}
                  
                  >
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

      <SidebarFooter>
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}
