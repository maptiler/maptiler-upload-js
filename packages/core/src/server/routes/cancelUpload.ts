import axios from 'axios'
import { DATASETS_SERVICE_URI } from '@upload/server/constants'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'

export const cancelUpload = async (id: string, serviceToken: string) => {
  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: DATASETS_SERVICE_URI,
      url: `/ingest/${id}/cancel`,
      method: 'POST',
      headers: {
        Authorization: `Token ${serviceToken}`,
      },
    })
  })
}
