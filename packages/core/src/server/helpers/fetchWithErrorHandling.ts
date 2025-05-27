import { HttpStatusCode, isAxiosError } from 'axios'
import type { GenericError } from '@upload/shared/types'
import type { AxiosResponse, AxiosError } from 'axios'

export const fetchWithErrorHandling = async (
  fetchFn: () => Promise<AxiosResponse>,
): Promise<AxiosResponse | AxiosError | GenericError> => {
  try {
    const response = await fetchFn()

    if (response.status === 200) {
      return response.data
    }

    return response
  } catch (error) {
    if (isAxiosError(error)) {
      return error
    }

    return { error: 'System error', status: HttpStatusCode.InternalServerError }
  }
}
