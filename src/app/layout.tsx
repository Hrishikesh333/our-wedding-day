import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Theatre Template Demo | The Digital Yes',
  description: 'An elegant Next.js template showcasing theatrical design and typography.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
