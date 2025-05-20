import axios from 'axios'
import { INGEST_SERVICE_URI } from '@upload/server/constants'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'
import type { ProcessPayload } from '@upload/shared/types'

export const processUpload = async (
  id: string,
  parts: ProcessPayload[],
  serviceToken: string,
) => {
  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: INGEST_SERVICE_URI,
      url: `/${id}/process`,
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
