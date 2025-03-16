import type { Metadata } from 'next'

import { getBaseUrl } from '@/libs/utils'

export const createMetadata = (
  override: Omit<Metadata, 'title'> & { title?: string },
): Metadata => {
  const siteName = 'TUCMC App'

  const url = override.openGraph?.url
    ? `${getBaseUrl()}${override.openGraph.url}`
    : getBaseUrl()
  const images = [
    ...((override.openGraph?.images as [] | null) ?? []),
    'og/image_url', // Or create your own API route to generate OG images in `/app/api/og`
  ]

  return {
    ...override,
    metadataBase: new URL(getBaseUrl()),
    title: override.title ? `${siteName} | ${override.title}` : siteName,
    description:
      override.description ??
      'TUCMC Application',
    applicationName: siteName,
    alternates: { canonical: url },
    twitter: { card: 'summary_large_image' },
    openGraph: { url, images, siteName, type: 'website', ...override.openGraph },
    icons: {
      // Replace with your own icons
      icon: 'favicon.ico',
      shortcut: 'favicon.ico',
      apple: 'favicon.ico',
    },
  }
}
