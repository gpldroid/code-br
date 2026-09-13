"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboardIcon,
  MailIcon,
  QrCodeIcon,
  ExternalLinkIcon,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SignOutButton } from "@/components/admin/sign-out-button"

const navItems = [
  { href: "/admin", label: "لوحة القيادة", icon: LayoutDashboardIcon },
  { href: "/admin/messages", label: "الرسائل", icon: MailIcon },
  { href: "/admin/qrcodes", label: "رموز QR", icon: QrCodeIcon },
]

export function AdminShell({
  children,
  adminName,
}: {
  children: React.ReactNode
  adminName: string
}) {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar side="right" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-2 px-2 py-1">
            <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <QrCodeIcon className="size-4" />
            </span>
            <span className="text-sm font-semibold">لوحة التحكم</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>القائمة</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      render={<Link href={item.href} />}
                      isActive={pathname === item.href}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                  <SidebarMenuButton render={<Link href="/" target="_blank" />}>
                    <ExternalLinkIcon />
                    <span>عرض الموقع</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <div className="px-2 py-1 text-xs text-muted-foreground truncate">{adminName}</div>
          <SidebarMenu>
            <SidebarMenuItem>
              <SignOutButton />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-medium">لوحة التحكم</span>
        </header>
        <div className="flex flex-1 flex-col gap-6 p-4 sm:p-6" dir="rtl">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
