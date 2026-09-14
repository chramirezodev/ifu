import { CollectionCards as CollectionCards_a8386ff05edd346cc1a2e9dea1a05156 } from '@payloadcms/next/rsc'
import { VercelBlobClientUploadHandler as VercelBlobClientUploadHandler_16c82c5e25f430251a3e5ef209744aea } from '@payloadcms/storage-vercel-blob/client'
import { BeforeDashboard as BeforeDashboard_mardini } from '@/components/admin/BeforeDashboard'

/** @type import('payload').ImportMap */
export const importMap = {
  '@payloadcms/next/rsc#CollectionCards': CollectionCards_a8386ff05edd346cc1a2e9dea1a05156,
  '@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler':
    VercelBlobClientUploadHandler_16c82c5e25f430251a3e5ef209744aea,
  '/components/admin/BeforeDashboard#BeforeDashboard': BeforeDashboard_mardini,
}
