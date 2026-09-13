"use client"

import { useState, useTransition } from "react"
import { CheckIcon, MailOpenIcon, Trash2Icon } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty"
import { toast } from "sonner"
import { markMessageRead, deleteMessage } from "@/app/actions/admin"

type Message = {
  id: number
  name: string
  email: string
  subject: string | null
  message: string
  isRead: boolean
  createdAt: Date
}

export function MessagesTable({ messages }: { messages: Message[] }) {
  const [isPending, startTransition] = useTransition()
  const [expanded, setExpanded] = useState<number | null>(null)

  if (messages.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <MailOpenIcon />
          </EmptyMedia>
          <EmptyTitle>لا توجد رسائل</EmptyTitle>
          <EmptyDescription>لم يتم استقبال أي رسائل تواصل حتى الآن.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>الحالة</TableHead>
          <TableHead>الاسم</TableHead>
          <TableHead>البريد الإلكتروني</TableHead>
          <TableHead>الرسالة</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead className="text-left">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {messages.map((m) => (
          <TableRow key={m.id}>
            <TableCell>
              <Badge variant={m.isRead ? "secondary" : "default"}>
                {m.isRead ? "مقروءة" : "جديدة"}
              </Badge>
            </TableCell>
            <TableCell className="font-medium">{m.name}</TableCell>
            <TableCell dir="ltr" className="text-right">
              {m.email}
            </TableCell>
            <TableCell className="max-w-xs">
              <button
                className="text-right hover:underline"
                onClick={() => setExpanded(expanded === m.id ? null : m.id)}
              >
                <span className={expanded === m.id ? "" : "line-clamp-1"}>
                  {m.subject ? `${m.subject}: ` : ""}
                  {m.message}
                </span>
              </button>
            </TableCell>
            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
              {new Date(m.createdAt).toLocaleDateString("ar")}
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-1">
                {!m.isRead && (
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={isPending}
                    onClick={() =>
                      startTransition(async () => {
                        await markMessageRead(m.id, true)
                        toast.success("تم تحديد الرسالة كمقروءة")
                      })
                    }
                    aria-label="تحديد كمقروءة"
                  >
                    <CheckIcon />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      await deleteMessage(m.id)
                      toast.success("تم حذف الرسالة")
                    })
                  }
                  aria-label="حذف الرسالة"
                >
                  <Trash2Icon className="text-destructive" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
