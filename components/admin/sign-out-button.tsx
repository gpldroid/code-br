"use client"

import { useRouter } from "next/navigation"
import { LogOutIcon } from "lucide-react"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"

export function SignOutButton() {
  const router = useRouter()

  return (
    <SidebarMenuButton
      onClick={async () => {
        await authClient.signOut()
        router.push("/admin/sign-in")
        router.refresh()
      }}
    >
      <LogOutIcon />
      <span>تسجيل الخروج</span>
    </SidebarMenuButton>
  )
}
