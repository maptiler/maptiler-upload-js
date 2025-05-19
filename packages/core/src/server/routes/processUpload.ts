import axios from 'axios'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'
import type { ProcessPayload } from '@upload/shared/types'

export const processUpload = async (
  id: string,
  parts: ProcessPayload[],
  serviceToken: string,
) => {
  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: 'https://service.maptiler.com/v1',
      url: `/tiles/ingest/${id}/process`,
      method: 'POST',
      headers: {
        Authorization: `Token ${serviceToken}`,
      },
      data: {
        upload_result: {
          type: 's3_multipart',
          parts,
        },
      },
    })
  })
}
