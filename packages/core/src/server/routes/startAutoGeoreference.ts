import axios from 'axios'
import { DATASETS_SERVICE_URI } from '@upload/server/constants'
import { fetchWithErrorHandling } from '@upload/server/helpers/fetchWithErrorHandling'
import type { Location } from '@upload/shared/types'

export const startAutoGeoreference = async (
  imageID: string,
  serviceToken: string,
  location?: Location,
) => {
  // Without a location, the service reads it from the image EXIF.
  const data = location ? { location } : undefined

  return fetchWithErrorHandling(() => {
    return axios({
      baseURL: DATASETS_SERVICE_URI,
      url: `/${imageID}/auto_georeference`,
      method: 'POST',
      headers: {
        Authorization: `Token ${serviceToken}`,
      },
      data,
    })
  })
}
