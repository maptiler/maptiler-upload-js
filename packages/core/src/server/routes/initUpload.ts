import axios from 'axios'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'
import type { OutputType } from '@upload/shared/types'

export const initUpload = async (
  filename: string,
  size: number,
  serviceToken: string,
  outputType: OutputType | null,
) => {
  const output = outputType
    ? {
        type: 'vector_features',
      }
    : undefined

  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: 'https://service.maptiler.com/v1',
      url: '/tiles/ingest',
      method: 'POST',
      headers: {
        Authorization: `Token ${serviceToken}`,
      },
      data: {
        filename,
        size,
        supported_upload_types: ['s3_multipart'],
        output,
      },
    })
  })
}
