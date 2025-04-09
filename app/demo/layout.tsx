import type React from "react"
export default function DemoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen bg-zinc-900 text-white">{children}</div>
}
