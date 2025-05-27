import { cancelUpload } from '@maptiler/upload-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const serviceToken = process.env.MAPTILER_SERVICE_TOKEN

  if (!serviceToken) {
    throw new Error(
      '❌ MAPTILER_SERVICE_TOKEN environment variable is required!',
    )
  }

  const { id } = await params
  const data = await cancelUpload(id, serviceToken)

  return NextResponse.json(data, { status: data.status })
}
