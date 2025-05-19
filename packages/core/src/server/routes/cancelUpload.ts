import axios from 'axios'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'

export const cancelUpload = async (id: string, serviceToken: string) => {
  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: 'https://service.maptiler.com/v1',
      url: `/tiles/ingest/${id}/cancel`,
      method: 'POST',
      headers: {
        Authorization: `Token ${serviceToken}`,
      },
    })
  })
}
