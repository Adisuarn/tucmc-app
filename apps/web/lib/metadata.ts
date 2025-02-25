import type { Metadata } from 'next'

import { getBaseUrl } from '@/lib/utils'

export const createMetadata = (
  override: Omit<Metadata, 'title'> & { title?: string },
): Metadata => {
  const siteName = 'TUCC APP'
  const description =
    'Application for facilitating TUCMC'

  const url = override.openGraph?.url
    ? `${getBaseUrl()}${override.openGraph.url}`
    : getBaseUrl()
  const images = [
    ...((override.openGraph?.images as [] | null) ?? []),
    `/api/og?title=${encodeURIComponent(override.title ?? siteName)}&description=${encodeURIComponent(override.description ?? description)}`,
  ]

  return {
    ...override,
    metadataBase: new URL(getBaseUrl()),
    title: override.title ? `${siteName} | ${override.title}` : siteName,
    description: override.description ?? description,
    applicationName: siteName,
    alternates: { canonical: url },
    twitter: { card: 'summary_large_image' },
    openGraph: {
      url,
      images,
      siteName,
      type: 'website',
      ...override.openGraph,
    },
    icons: {
      icon: 'favicon.ico',
      shortcut: 'favicon16x16.ico',
      apple: 'faviconhd.ico',
    },
  }
}
