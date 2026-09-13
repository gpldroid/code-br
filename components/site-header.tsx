"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { QrCodeIcon, MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن الموقع" },
  { href: "/contact", label: "تواصل معنا" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <QrCodeIcon data-icon className="size-4" />
          </span>
          <span>مولّد QR</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Button
              key={link.href}
              variant={pathname === link.href ? "secondary" : "ghost"}
              size="sm"
              render={<Link href={link.href} />}
            >
              {link.label}
            </Button>
          ))}
          <Button variant="outline" size="sm" className="mr-2" render={<Link href="/admin" />}>
            لوحة التحكم
          </Button>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setOpen(true)}
          aria-label="فتح القائمة"
        >
          <MenuIcon data-icon />
        </Button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>القائمة</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {[...links, { href: "/admin", label: "لوحة التحكم" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm font-medium hover:bg-accent",
                      pathname === link.href && "bg-secondary",
                    )}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
