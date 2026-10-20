import axios from 'axios'
import { DATASETS_SERVICE_URI } from '@upload/server/constants'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'

export const cancelAutoGeoreference = async (
  id: string,
  serviceToken: string,
) => {
  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: DATASETS_SERVICE_URI,
      url: `/auto_georeference/${id}/cancel`,
      method: 'POST',
      headers: {
        Authorization: `Token ${serviceToken}`,
      },
    })
  })
}
