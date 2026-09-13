import { QrCodeIcon, ScanLineIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { QrGenerator } from "@/components/qr-generator"
import { QrScanner } from "@/components/qr-scanner"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col" dir="rtl">
      <SiteHeader />

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            أنشئ وامسح رموز QR بسهولة
          </h1>
          <p className="text-muted-foreground">
            أداة مجانية لإنشاء رموز QR للروابط، النصوص، شبكات الواي فاي، وجهات الاتصال — وقراءتها مباشرة من متصفحك.
          </p>
        </div>

        <Tabs defaultValue="generate">
          <TabsList className="mx-auto grid w-full max-w-sm grid-cols-2">
            <TabsTrigger value="generate">
              <QrCodeIcon data-icon="inline-start" />
              إنشاء رمز
            </TabsTrigger>
            <TabsTrigger value="scan">
              <ScanLineIcon data-icon="inline-start" />
              قراءة رمز
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="mt-6">
            <QrGenerator />
          </TabsContent>

          <TabsContent value="scan" className="mt-6">
            <QrScanner />
          </TabsContent>
        </Tabs>
      </main>

      <SiteFooter />
    </div>
  )
}
