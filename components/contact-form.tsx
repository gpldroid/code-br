"use client"

import { useRef, useState, useTransition } from "react"
import { SendIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Field, FieldGroup, FieldLabel, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { submitContactMessage } from "@/app/actions/contact"

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await submitContactMessage(formData)
      if (result.ok) {
        setSuccess(true)
        formRef.current?.reset()
      } else {
        setError(result.error ?? "حدث خطأ ما.")
      }
    })
  }

  if (success) {
    return (
      <div className="rounded-lg border border-border bg-muted p-6 text-center">
        <p className="font-medium">تم إرسال رسالتك بنجاح</p>
        <p className="mt-1 text-sm text-muted-foreground">
          سنقوم بالرد عليك في أقرب وقت ممكن.
        </p>
        <Button variant="outline" size="sm" className="mt-4" onClick={() => setSuccess(false)}>
          إرسال رسالة أخرى
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} action={handleSubmit}>
      <FieldGroup>
        <Field data-invalid={!!error || undefined}>
          <FieldLabel htmlFor="name">الاسم</FieldLabel>
          <Input id="name" name="name" required maxLength={200} />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">البريد الإلكتروني</FieldLabel>
          <Input id="email" name="email" type="email" dir="ltr" required maxLength={320} />
        </Field>
        <Field>
          <FieldLabel htmlFor="subject">الموضوع (اختياري)</FieldLabel>
          <Input id="subject" name="subject" maxLength={200} />
        </Field>
        <Field data-invalid={!!error || undefined}>
          <FieldLabel htmlFor="message">الرسالة</FieldLabel>
          <Textarea id="message" name="message" rows={5} required maxLength={5000} />
          {error && <FieldError>{error}</FieldError>}
        </Field>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : <SendIcon data-icon="inline-start" />}
          إرسال الرسالة
        </Button>
      </FieldGroup>
    </form>
  )
}
