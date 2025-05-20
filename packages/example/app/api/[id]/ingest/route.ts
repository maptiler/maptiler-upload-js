import { replaceUpload } from '@maptiler/upload-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const serviceToken = process.env.MAPTILER_SERVICE_TOKEN

  if (!serviceToken) {
    throw new Error(
      '❌ MAPTILER_SERVICE_TOKEN environment variable is required!',
    )
  }

  const { id } = await params
  const { name, size, type } = await request.json()
  const data = await replaceUpload(id, name, size, serviceToken, type)

  return NextResponse.json(data, { status: data.status })
}
