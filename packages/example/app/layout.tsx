import ThemeRegistry from '@example/components/ThemeRegistry/ThemeRegistry'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'MapTiler Upload JS',
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{props.children}</ThemeRegistry>
      </body>
    </html>
  )
}
