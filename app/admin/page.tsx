import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { QrCodeIcon, TrendingUpIcon, MailIcon, MailWarningIcon } from "lucide-react"
import { auth } from "@/lib/auth"
import { getDashboardStats } from "@/app/actions/admin"
import { AdminShell } from "@/components/admin/admin-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const typeLabels: Record<string, string> = {
  url: "روابط",
  text: "نصوص",
  wifi: "واي فاي",
  vcard: "جهات اتصال",
  scan: "عمليات قراءة",
}

export default async function AdminDashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")

  const stats = await getDashboardStats()

  const cards = [
    { label: "إجمالي الرموز المُنشأة", value: stats.totalQr, icon: QrCodeIcon },
    { label: "رموز هذا الأسبوع", value: stats.weekQr, icon: TrendingUpIcon },
    { label: "إجمالي الرسائل", value: stats.totalMessages, icon: MailIcon },
    { label: "رسائل غير مقروءة", value: stats.unreadMessages, icon: MailWarningIcon },
  ]

  return (
    <AdminShell adminName={session.user.name}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">لوحة القيادة</h1>
        <p className="text-sm text-muted-foreground">نظرة عامة على نشاط الموقع.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.label}
              </CardTitle>
              <card.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الرموز بحسب النوع</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.byType.length === 0 ? (
            <p className="text-sm text-muted-foreground">لا توجد بيانات بعد.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {stats.byType.map((row) => (
                <Badge key={row.type} variant="secondary">
                  {typeLabels[row.type] ?? row.type}: {row.value}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminShell>
  )
}
