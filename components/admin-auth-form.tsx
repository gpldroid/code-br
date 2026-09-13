"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LockIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"

export function AdminAuthForm({ mode }: { mode: "sign-in" | "sign-up" }) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result =
      mode === "sign-up"
        ? await authClient.signUp.email({ email, password, name })
        : await authClient.signIn.email({ email, password })

    setLoading(false)

    if (result.error) {
      setError("بيانات الدخول غير صحيحة.")
      return
    }

    router.push("/admin")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit}>
      <FieldGroup>
        {mode === "sign-up" && (
          <Field>
            <FieldLabel htmlFor="name">الاسم</FieldLabel>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </Field>
        )}
        <Field>
          <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
          <Input
            id="email"
            type="email"
            dir="ltr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field data-invalid={!!error || undefined}>
          <FieldLabel htmlFor="password">كلمة المرور</FieldLabel>
          <Input
            id="password"
            type="password"
            dir="ltr"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          {error && <FieldError>{error}</FieldError>}
        </Field>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner /> : <LockIcon data-icon="inline-start" />}
          {mode === "sign-up" ? "إنشاء حساب المدير" : "تسجيل الدخول"}
        </Button>
      </FieldGroup>
    </form>
  )
}
