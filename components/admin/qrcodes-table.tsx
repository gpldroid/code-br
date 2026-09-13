"use client"

import { useTransition } from "react"
import { QrCodeIcon, Trash2Icon } from "lucide-react"
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
import { deleteQrCode } from "@/app/actions/admin"

type QrCode = {
  id: number
  type: string
  title: string | null
  content: string
  createdAt: Date
}

const typeLabels: Record<string, string> = {
  url: "رابط",
  text: "نص",
  wifi: "واي فاي",
  vcard: "جهة اتصال",
  scan: "قراءة",
}

export function QrCodesTable({ qrCodes }: { qrCodes: QrCode[] }) {
  const [isPending, startTransition] = useTransition()

  if (qrCodes.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <QrCodeIcon />
          </EmptyMedia>
          <EmptyTitle>لا توجد رموز</EmptyTitle>
          <EmptyDescription>لم يتم إنشاء أو قراءة أي رموز QR حتى الآن.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>النوع</TableHead>
          <TableHead>المحتوى</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead className="text-left">إجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {qrCodes.map((q) => (
          <TableRow key={q.id}>
            <TableCell>
              <Badge variant="secondary">{typeLabels[q.type] ?? q.type}</Badge>
            </TableCell>
            <TableCell className="max-w-sm truncate" dir="auto">
              {q.content}
            </TableCell>
            <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
              {new Date(q.createdAt).toLocaleDateString("ar")}
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  disabled={isPending}
                  onClick={() =>
                    startTransition(async () => {
                      await deleteQrCode(q.id)
                      toast.success("تم حذف الرمز")
                    })
                  }
                  aria-label="حذف الرمز"
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
