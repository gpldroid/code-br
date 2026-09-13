import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-svh flex-col" dir="rtl">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">سياسة الخصوصية</h1>
        <div className="flex flex-col gap-4 text-sm leading-7 text-muted-foreground">
          <p>
            نحترم خصوصيتك. عند استخدام أداة قراءة رموز QR، تتم معالجة الصور والفيديو داخل متصفحك فقط ولا يتم رفعها إلى خوادمنا.
          </p>
          <p>
            نحتفظ بسجل مبسّط للرموز التي يتم إنشاؤها (نوع الرمز ومحتواه) لأغراض إحصائية داخلية، ولا نقوم بمشاركة هذه البيانات مع أي طرف ثالث.
          </p>
          <p>
            عند إرسال رسالة عبر نموذج التواصل، نستخدم بياناتك (الاسم والبريد الإلكتروني والرسالة) فقط للرد عليك.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
