"use client";

import { ChevronRight, Gauge, UserCog } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/Components/ui/sidebar";
import { router, usePage } from "@inertiajs/react";

export function NavMain() {
  const { url } = usePage();
  const urlSplitedBecomeRouteName = url.split('/')[1];

  const navMain = [
    {
      title: 'Dashboard',
      route: 'dashboard',
      icon: <Gauge />
    },
    {
      title: "Users Management",
      icon: <UserCog />,
      items: [
        {
          title: "List Users",
          route: "users-management",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        Sidebar
      </SidebarGroupLabel>
      <SidebarMenu>
        {navMain.map((item) => (
          (!item.items) ? (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} isActive={(item.route === urlSplitedBecomeRouteName)} onClick={() => router.visit(route(item.route))}>
                {item.icon}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <Collapsible key={item.title} asChild defaultOpen={true} className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} isActive={item.items.some(subItem => subItem.route === urlSplitedBecomeRouteName)}>
                    {item.icon}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild isActive={(subItem.route === urlSplitedBecomeRouteName)} onClick={() => router.visit(route(subItem.route))}>
                          <span>
                            {subItem.title}
                          </span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup >
  );
}