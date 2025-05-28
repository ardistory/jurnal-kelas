import { NavMain } from "@/Components/NavMain";
import { NavUser } from "@/Components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/Components/ui/sidebar";
import RadixUI from "./RadixUI";
import { usePage } from "@inertiajs/react";

export function AppSidebar({ user, ...props }) {
  const { app_name } = usePage().props;

  return (
    <Sidebar collapsible={'icon'} {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <RadixUI className='dark' />
              <span className="italic text-2xl font-bold">
                {app_name}
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
