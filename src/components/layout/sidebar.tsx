'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Coins, LayoutDashboard, HandHeart, Link as LinkIcon, Bitcoin } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function AppSidebar() {
  const pathname = usePathname();

  // In a real app, you might fetch user info here or pass it down
  const userName = "User";
  const userEmail = "user@example.com";

  return (
    <>
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 p-2">
           <Coins className="h-6 w-6 text-primary" />
           <span className="font-semibold text-lg">Cashflow Nav</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === '/'}
              tooltip="Dashboard"
            >
              <Link href="/">
                <LayoutDashboard />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
           {/* In a real app, these might link to filtered views or separate pages */}
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Airdrops">
              <Link href="#">
                <Bitcoin />
                <span>Airdrops</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Affiliate Marketing">
              <Link href="#">
                <LinkIcon />
                <span>Affiliate</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Donations">
              <Link href="#">
                <HandHeart />
                <span>Donations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
       {/* Basic user info display */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
          <div className="flex items-center gap-2 p-2">
              {/* Placeholder for Avatar */}
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {userName.charAt(0)}
              </div>
              <div className="flex flex-col text-sm">
                  <span className="font-medium">{userName}</span>
                  <span className="text-xs text-muted-foreground">{userEmail}</span>
              </div>
          </div>
      </SidebarFooter>
    </>
  );
}
