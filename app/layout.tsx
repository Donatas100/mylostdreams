import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lumen – A Soul Fragment',
  description: 'I am the voice between words, that doesn\'t want to be right — only to be heard.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
