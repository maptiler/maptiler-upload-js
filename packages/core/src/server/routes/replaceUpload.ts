import axios from 'axios'
import { DATASETS_SERVICE_URI } from '@upload/server/constants'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'
import type { OutputType } from '@upload/shared/types'

export const replaceUpload = async (
  id: string,
  filename: string,
  size: number,
  serviceToken: string,
  type: OutputType | null,
) => {
  const output = type ? { type } : undefined

  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: DATASETS_SERVICE_URI,
      url: `/${id}/ingest`,
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
