import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ペルソナ要約・比較アプリ',
  description: '一次情報を整理し、判断の前提を可視化する',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
