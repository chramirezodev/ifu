import React, { createContext, useContext } from 'react'
import { fallbackCMS } from '@/lib/cms/fallback'
import type { CMSData } from '@/lib/cms/types'

const CMSContext = createContext<CMSData>(fallbackCMS)

export function CMSProvider({
  value,
  children,
}: {
  value?: CMSData | null
  children: React.ReactNode
}) {
  return <CMSContext.Provider value={value || fallbackCMS}>{children}</CMSContext.Provider>
}

export function useCMS(): CMSData {
  return useContext(CMSContext)
}
