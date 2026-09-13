import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { hasAdminAccount } from "@/app/actions/admin"
import { AdminAuthForm } from "@/components/admin-auth-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default async function AdminSignUpPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session?.user) redirect("/admin")

  // Only allow creating the admin account once. After that, use sign-in.
  const hasAdmin = await hasAdminAccount()
  if (hasAdmin) redirect("/admin/sign-in")

  return (
    <div className="flex min-h-svh items-center justify-center p-4" dir="rtl">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>إنشاء حساب المدير</CardTitle>
          <CardDescription>هذه الخطوة تتم مرة واحدة فقط لإنشاء حساب لوحة التحكم.</CardDescription>
        </CardHeader>
        <CardContent>
          <AdminAuthForm mode="sign-up" />
        </CardContent>
      </Card>
    </div>
  )
}
