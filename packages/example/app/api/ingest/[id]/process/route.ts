import { processUpload } from '@maptiler/upload-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const serviceToken = process.env.SERVICE_TOKEN

  if (!serviceToken) {
    throw new Error('❌ SERVICE_TOKEN environment variable is required!')
  }

  const { id } = await params
  const payload = await request.json()
  const data = await processUpload(id, payload, serviceToken)

  return NextResponse.json(data, { status: data.status })
}
