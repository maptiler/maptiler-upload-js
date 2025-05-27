'use client'
import CssBaseline from '@mui/joy/CssBaseline'
import { CssVarsProvider } from '@mui/joy/styles'
import React from 'react'
import NextAppDirEmotionCacheProvider from './EmotionCache'
import theme from './theme'
import type { PropsWithChildren } from 'react'

export default function ThemeRegistry({ children }: PropsWithChildren) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'joy' }}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </NextAppDirEmotionCacheProvider>
  )
}
