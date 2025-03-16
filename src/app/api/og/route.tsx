import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)

  const title = searchParams.get('title') ?? 'TUCMC APP'
  const description =
    searchParams.get('description') ??
    'Application for facilitating TUCMC'

  return new ImageResponse(
    (
      <div
        style={{
          fontFamily: 'Geist',
          backgroundColor: '#0c0c0c',
          backgroundImage: `linear-gradient(to top right, hsl(221,89%,72%), transparent)`,
        }}
        tw="flex flex-col w-full h-full p-12 text-white"
      >
        <div tw="flex flex-row items-center mb-3 text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`logo.png`}
            tw="w-20 h-20 mr-4"
            style={{ filter: 'invert(1)' }}
          />

          <p style={{ fontSize: '56px', fontWeight: 600 }}>Tiesen</p>
        </div>

        <p
          style={{
            fontWeight: 800,
            fontSize: '48px',
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: '32px', color: 'rgba(240,240,240,0.8)' }}>
          {description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
}
