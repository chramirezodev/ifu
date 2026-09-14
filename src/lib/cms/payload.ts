import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function mediaUrl(media: unknown, fallback = ''): string {
  if (!media || typeof media !== 'object') return fallback
  const m = media as { url?: string }
  if (m.url) {
    if (m.url.startsWith('http')) return m.url
    const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
    return `${base}${m.url}`
  }
  return fallback
}
