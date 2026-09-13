import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function TermsPage() {
  return (
    <div className="flex min-h-svh flex-col" dir="rtl">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">شروط الاستخدام</h1>
        <div className="flex flex-col gap-4 text-sm leading-7 text-muted-foreground">
          <p>باستخدامك هذا الموقع فإنك توافق على استخدامه لأغراض قانونية فقط.</p>
          <p>
            نحن غير مسؤولين عن محتوى رموز QR التي يقوم المستخدمون بإنشائها أو قراءتها باستخدام هذه الأداة.
          </p>
          <p>يحق لنا تعديل هذه الشروط في أي وقت دون إشعار مسبق.</p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
