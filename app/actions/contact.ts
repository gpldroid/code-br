"use server"

import { db } from "@/lib/db"
import { contactMessages } from "@/lib/db/schema"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function submitContactMessage(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const subject = String(formData.get("subject") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  if (!name || name.length > 200) {
    return { ok: false as const, error: "الاسم مطلوب." }
  }
  if (!email || !EMAIL_RE.test(email) || email.length > 320) {
    return { ok: false as const, error: "البريد الإلكتروني غير صحيح." }
  }
  if (!message || message.length > 5000) {
    return { ok: false as const, error: "الرسالة مطلوبة." }
  }

  await db.insert(contactMessages).values({
    name: name.slice(0, 200),
    email: email.slice(0, 320),
    subject: subject.slice(0, 200) || null,
    message: message.slice(0, 5000),
  })

  return { ok: true as const }
}
