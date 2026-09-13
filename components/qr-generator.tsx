"use client"

import { useMemo, useRef, useState, useTransition } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { DownloadIcon, LinkIcon, TypeIcon, WifiIcon, UserIcon } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { logQrCode } from "@/app/actions/qr"

type Mode = "text" | "url" | "wifi" | "vcard"

function buildWifiPayload(ssid: string, password: string, security: string) {
  const esc = (v: string) => v.replace(/([\\;,:"])/g, "\\$1")
  return `WIFI:T:${security};S:${esc(ssid)};P:${esc(password)};;`
}

function buildVCardPayload(name: string, phone: string, email: string, org: string) {
  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${name}`,
    org ? `ORG:${org}` : "",
    phone ? `TEL:${phone}` : "",
    email ? `EMAIL:${email}` : "",
    "END:VCARD",
  ]
    .filter(Boolean)
    .join("\n")
}

export function QrGenerator() {
  const [mode, setMode] = useState<Mode>("url")
  const [text, setText] = useState("")
  const [url, setUrl] = useState("")
  const [ssid, setSsid] = useState("")
  const [wifiPassword, setWifiPassword] = useState("")
  const [security, setSecurity] = useState("WPA")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [org, setOrg] = useState("")
  const [isPending, startTransition] = useTransition()
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  const value = useMemo(() => {
    switch (mode) {
      case "text":
        return text.trim()
      case "url": {
        const v = url.trim()
        if (!v) return ""
        return /^https?:\/\//i.test(v) ? v : `https://${v}`
      }
      case "wifi":
        return ssid.trim() ? buildWifiPayload(ssid.trim(), wifiPassword, security) : ""
      case "vcard":
        return name.trim() ? buildVCardPayload(name.trim(), phone.trim(), email.trim(), org.trim()) : ""
    }
  }, [mode, text, url, ssid, wifiPassword, security, name, phone, email, org])

  function handleDownload() {
    const canvas = canvasWrapRef.current?.querySelector("canvas")
    if (!canvas) return
    const url = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = "qrcode.png"
    a.click()

    startTransition(() => {
      logQrCode({ type: mode, content: value })
    })
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Tabs value={mode} onValueChange={(v) => setMode(v as Mode)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="url">
            <LinkIcon data-icon="inline-start" />
            رابط
          </TabsTrigger>
          <TabsTrigger value="text">
            <TypeIcon data-icon="inline-start" />
            نص
          </TabsTrigger>
          <TabsTrigger value="wifi">
            <WifiIcon data-icon="inline-start" />
            واي فاي
          </TabsTrigger>
          <TabsTrigger value="vcard">
            <UserIcon data-icon="inline-start" />
            جهة اتصال
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="url">عنوان الرابط</FieldLabel>
              <Input
                id="url"
                placeholder="example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                dir="ltr"
              />
            </Field>
          </FieldGroup>
        </TabsContent>

        <TabsContent value="text" className="mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="text">النص</FieldLabel>
              <Textarea
                id="text"
                placeholder="اكتب النص هنا"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
              />
            </Field>
          </FieldGroup>
        </TabsContent>

        <TabsContent value="wifi" className="mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="ssid">اسم الشبكة (SSID)</FieldLabel>
              <Input id="ssid" value={ssid} onChange={(e) => setSsid(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="wifi-password">كلمة المرور</FieldLabel>
              <Input
                id="wifi-password"
                type="text"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
              />
            </Field>
          </FieldGroup>
        </TabsContent>

        <TabsContent value="vcard" className="mt-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">الاسم الكامل</FieldLabel>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="org">الشركة (اختياري)</FieldLabel>
              <Input id="org" value={org} onChange={(e) => setOrg(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
              <Input id="phone" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
              <Input id="email" dir="ltr" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Field>
          </FieldGroup>
        </TabsContent>
      </Tabs>

      <Card>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-10">
          <div
            ref={canvasWrapRef}
            className="flex size-56 items-center justify-center rounded-lg border border-border bg-white p-4"
          >
            {value ? (
              <QRCodeCanvas value={value} size={224} level="M" />
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                أدخل البيانات لعرض رمز QR
              </p>
            )}
          </div>
          <Button onClick={handleDownload} disabled={!value || isPending} className="w-full">
            <DownloadIcon data-icon="inline-start" />
            تحميل الصورة
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
