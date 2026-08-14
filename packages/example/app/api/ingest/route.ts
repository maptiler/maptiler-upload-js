import { initUpload } from '@maptiler/upload-js'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const serviceToken = process.env.MAPTILER_SERVICE_TOKEN

  if (!serviceToken) {
    throw new Error(
      '❌ MAPTILER_SERVICE_TOKEN environment variable is required!',
    )
  }

  const { name, size, type, projectID } = await request.json()
  const data = await initUpload(name, size, serviceToken, type, projectID)

  return NextResponse.json(data, { status: data.status })
}
