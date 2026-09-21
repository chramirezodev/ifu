import { getPayload } from 'payload'
import config from '@payload-config'

export async function getPayloadClient() {
  return getPayload({ config })
}

export function mediaUrl(media: unknown, fallback = ''): string {
  const toPath = (url: string) => {
    if (!url) return ''
    if (url.startsWith('/')) return url
    try {
      const parsed = new URL(url)
      const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
      if (base) {
        const baseHost = new URL(base).host
        if (parsed.host === baseHost || parsed.host === 'mardinilawfirm.com') {
          return `${parsed.pathname}${parsed.search}`
        }
      }
      if (parsed.host === 'mardinilawfirm.com' || parsed.host.endsWith('.vercel.app')) {
        return `${parsed.pathname}${parsed.search}`
      }
    } catch {
      /* keep absolute */
    }
    return url
  }

  if (media && typeof media === 'object') {
    const m = media as { url?: string }
    if (m.url) return toPath(m.url)
  }
  return toPath(fallback)
}
