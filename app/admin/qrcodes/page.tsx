import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getQrCodes } from "@/app/actions/admin"
import { AdminShell } from "@/components/admin/admin-shell"
import { QrCodesTable } from "@/components/admin/qrcodes-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminQrCodesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")

  const qrCodes = await getQrCodes()

  return (
    <AdminShell adminName={session.user.name}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">سجل رموز QR</h1>
        <p className="text-sm text-muted-foreground">
          آخر 500 رمز QR تم إنشاؤه أو قراءته على الموقع.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الرموز ({qrCodes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <QrCodesTable qrCodes={qrCodes} />
        </CardContent>
      </Card>
    </AdminShell>
  )
}
