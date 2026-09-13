"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/db"
import { contactMessages, qrCodes, user } from "@/lib/db/schema"
import { count, desc, eq, gte, sql } from "drizzle-orm"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

async function requireAdmin() {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) throw new Error("Unauthorized")
  return session.user
}

export async function getDashboardStats() {
  await requireAdmin()

  const since = new Date()
  since.setDate(since.getDate() - 7)

  const [totalQr] = await db.select({ value: count() }).from(qrCodes)
  const [weekQr] = await db
    .select({ value: count() })
    .from(qrCodes)
    .where(gte(qrCodes.createdAt, since))
  const [totalMessages] = await db.select({ value: count() }).from(contactMessages)
  const [unreadMessages] = await db
    .select({ value: count() })
    .from(contactMessages)
    .where(eq(contactMessages.isRead, false))

  const byType = await db
    .select({ type: qrCodes.type, value: count() })
    .from(qrCodes)
    .groupBy(qrCodes.type)
    .orderBy(desc(count()))

  return {
    totalQr: totalQr?.value ?? 0,
    weekQr: weekQr?.value ?? 0,
    totalMessages: totalMessages?.value ?? 0,
    unreadMessages: unreadMessages?.value ?? 0,
    byType,
  }
}

export async function getMessages() {
  await requireAdmin()
  return db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))
}

export async function markMessageRead(id: number, isRead: boolean) {
  await requireAdmin()
  await db.update(contactMessages).set({ isRead }).where(eq(contactMessages.id, id))
  revalidatePath("/admin/messages")
}

export async function deleteMessage(id: number) {
  await requireAdmin()
  await db.delete(contactMessages).where(eq(contactMessages.id, id))
  revalidatePath("/admin/messages")
}

export async function getQrCodes() {
  await requireAdmin()
  return db.select().from(qrCodes).orderBy(desc(qrCodes.createdAt)).limit(500)
}

export async function deleteQrCode(id: number) {
  await requireAdmin()
  await db.delete(qrCodes).where(eq(qrCodes.id, id))
  revalidatePath("/admin/qrcodes")
}

export async function hasAdminAccount() {
  const [row] = await db.select({ value: count() }).from(user)
  return (row?.value ?? 0) > 0
}
