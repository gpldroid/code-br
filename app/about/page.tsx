import { QrCodeIcon, ScanLineIcon, ShieldCheckIcon } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: QrCodeIcon,
    title: "إنشاء رموز QR",
    description: "أنشئ رموز QR للروابط، النصوص، شبكات الواي فاي، وجهات الاتصال في ثوانٍ.",
  },
  {
    icon: ScanLineIcon,
    title: "قراءة رموز QR",
    description: "استخدم كاميرا جهازك أو رفع صورة لقراءة أي رمز QR فورًا.",
  },
  {
    icon: ShieldCheckIcon,
    title: "خصوصية وأمان",
    description: "تتم معالجة قراءة الرموز داخل متصفحك مباشرة دون رفع الصور إلى خوادمنا.",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-svh flex-col" dir="rtl">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-4 py-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">عن الموقع</h1>
          <p className="text-muted-foreground">
            مولّد QR هو أداة مجانية وسهلة الاستخدام لإنشاء وقراءة رموز QR مباشرة من متصفحك، بدون الحاجة لتثبيت أي برنامج.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <feature.icon data-icon className="size-5" />
                </div>
                <CardTitle className="mt-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
