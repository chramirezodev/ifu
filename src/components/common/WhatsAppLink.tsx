import React from 'react'
import { useCMS } from '@/context/CMSContext'

export const WHATSAPP_MESSAGE_EN =
  'Hello, I would like to schedule a consultation with Mardini Law Firm.'

type WhatsAppLinkProps = {
  message?: string
  className?: string
  children?: React.ReactNode
}

const WhatsAppLink = ({ message, className, children }: WhatsAppLinkProps) => {
  const { siteSettings } = useCMS()
  const text = message || siteSettings.consultationWhatsAppMessage
  const href = `https://wa.me/${siteSettings.whatsappNumber}?text=${encodeURIComponent(text)}`

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children ?? siteSettings.phone}
    </a>
  )
}

export default WhatsAppLink
