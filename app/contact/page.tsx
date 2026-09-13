import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <div className="flex min-h-svh flex-col" dir="rtl">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">تواصل معنا</h1>
          <p className="text-muted-foreground">
            لديك سؤال أو ملاحظة؟ راسلنا وسنرد عليك في أقرب وقت.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>نموذج التواصل</CardTitle>
            <CardDescription>سيتم إرسال رسالتك إلى فريق الدعم.</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
