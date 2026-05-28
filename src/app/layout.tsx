import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '全球劳动法律查询系统 | Global Labor Law Database',
  description: '查询 30+ 国家的劳动法规，精准的中文翻译和专业解读。日本、韩国、德国、法国、英国等主要国家的最新劳动法条款。',
  keywords: '劳动法、劳动法律、就业法、解雇、社保、国际劳动法',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
