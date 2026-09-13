"use server"

import { db } from "@/lib/db"
import { qrCodes } from "@/lib/db/schema"

export async function logQrCode(data: {
  type: string
  title?: string
  content: string
}) {
  const content = data.content.trim()
  if (!content) return { ok: false as const }

  await db.insert(qrCodes).values({
    type: data.type,
    title: data.title?.trim() || null,
    content: content.slice(0, 4000),
  })

  return { ok: true as const }
}
