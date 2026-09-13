import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} مولّد QR. جميع الحقوق محفوظة.</p>
        <nav className="flex items-center gap-4">
          <Link href="/about" className="hover:text-foreground">
            عن الموقع
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            تواصل معنا
          </Link>
          <Link href="/privacy" className="hover:text-foreground">
            الخصوصية
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            الشروط
          </Link>
        </nav>
      </div>
    </footer>
  )
}
