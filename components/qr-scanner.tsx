"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import jsQR from "jsqr"
import { CameraIcon, CopyIcon, UploadIcon, VideoOffIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty"
import { toast } from "sonner"
import { logQrCode } from "@/app/actions/qr"

export function QrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const rafRef = useRef<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [scanning, setScanning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const stopCamera = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    setScanning(false)
  }, [])

  useEffect(() => stopCamera, [stopCamera])

  function handleDecoded(value: string) {
    setResult(value)
    toast.success("تم قراءة الرمز بنجاح")
    logQrCode({ type: "scan", content: value })
  }

  async function startCamera() {
    setError(null)
    setResult(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setScanning(true)
      tick()
    } catch {
      setError("تعذر الوصول إلى الكاميرا. تحقق من الأذونات.")
    }
  }

  function tick() {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      rafRef.current = requestAnimationFrame(tick)
      return
    }
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const code = jsQR(imageData.data, imageData.width, imageData.height)
    if (code) {
      stopCamera()
      handleDecoded(code.data)
      return
    }
    rafRef.current = requestAnimationFrame(tick)
  }

  function handleFile(file: File) {
    setError(null)
    setResult(null)
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        handleDecoded(code.data)
      } else {
        setError("لم يتم العثور على رمز QR في هذه الصورة.")
      }
    }
    img.src = URL.createObjectURL(file)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-6">
          <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
            <video
              ref={videoRef}
              className={scanning ? "size-full object-cover" : "hidden"}
              muted
              playsInline
            />
            {!scanning && (
              <CameraIcon className="size-10 text-muted-foreground" />
            )}
          </div>
          <canvas ref={canvasRef} className="hidden" />

          <div className="flex w-full gap-2">
            {scanning ? (
              <Button variant="outline" onClick={stopCamera} className="flex-1">
                <VideoOffIcon data-icon="inline-start" />
                إيقاف الكاميرا
              </Button>
            ) : (
              <Button onClick={startCamera} className="flex-1">
                <CameraIcon data-icon="inline-start" />
                تشغيل الكاميرا
              </Button>
            )}
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <UploadIcon data-icon="inline-start" />
              رفع صورة
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) handleFile(file)
                e.target.value = ""
              }}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="py-6">
          {result ? (
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-muted-foreground">النتيجة</p>
              <p className="break-all rounded-md border border-border bg-muted p-3 text-sm" dir="auto">
                {result}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(result)
                    toast.success("تم النسخ")
                  }}
                >
                  <CopyIcon data-icon="inline-start" />
                  نسخ
                </Button>
                {/^https?:\/\//i.test(result) && (
                  <Button
                    size="sm"
                    render={<a href={result} target="_blank" rel="noopener noreferrer" />}
                  >
                    فتح الرابط
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CameraIcon />
                </EmptyMedia>
                <EmptyTitle>لا توجد نتيجة بعد</EmptyTitle>
                <EmptyDescription>
                  شغّل الكاميرا أو ارفع صورة تحتوي على رمز QR لقراءته.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
