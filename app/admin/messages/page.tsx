import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { getMessages } from "@/app/actions/admin"
import { AdminShell } from "@/components/admin/admin-shell"
import { MessagesTable } from "@/components/admin/messages-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function AdminMessagesPage() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) redirect("/admin/sign-in")

  const messages = await getMessages()

  return (
    <AdminShell adminName={session.user.name}>
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">رسائل التواصل</h1>
        <p className="text-sm text-muted-foreground">جميع الرسائل الواردة من نموذج التواصل.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>الرسائل ({messages.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <MessagesTable messages={messages} />
        </CardContent>
      </Card>
    </AdminShell>
  )
}
