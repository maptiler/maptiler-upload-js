import axios, { HttpStatusCode, isAxiosError } from 'axios'
import { Status } from './enums'
import type { ProcessPayload } from '@upload/shared/types'
import type { AxiosProgressEvent, AxiosResponse } from 'axios'
import type {
  ChangeCallback,
  ApiConfig,
  ErrorCallback,
  InitUploadResponse,
  InternalPart,
  Part,
  Progress,
  UploadConfig,
} from './types'

export class UploadAPI {
  public readonly id: string
  public readonly file: File

  private readonly processURI: string
  private readonly cancelURI: string
  private readonly onChange: ChangeCallback
  private readonly onError: ErrorCallback
  private readonly parts: InternalPart[]

  private status: Status
  private uploaded: number
  private startedAt: number
  private progress: Progress

  constructor(
    config: UploadConfig,
    onChange: ChangeCallback,
    onError: ErrorCallback,
  ) {
    this.id = config.id
    this.file = config.file

    this.processURI = config.processURI
    this.cancelURI = config.cancelURI

    this.onChange = onChange
    this.onError = onError

    this.parts = config.parts.map((part: Part) => {
      // Parts retrieved from S3 are numbered starting from 1.
      // For our internal use we need index starting from 0.
      const index = part.id - 1

      // An index into the Blob indicating the first byte.
      const start = config.partSize * index

      // An index into the Blob indicating the last byte.
      let end = start + config.partSize
      end = end > config.file.size ? config.file.size : end

      return {
        url: part.url,
        index,
        start,
        end,
      }
    })

    this.status = Status.Added
    // Number of bytes already uploaded.
    this.uploaded = 0
    // Time when the upload started.
    this.startedAt = 0

    this.progress = {
      // Bytes.
      uploaded: 0,
      // Bytes.
      total: this.file.size,
      // Milliseconds.
      elapsedTime: 0,
      // Bytes per one millisecond.
      bitrate: 0,
      // Milliseconds.
      remainingTime: 0,
    }
  }

  getStatus(): Status {
    return this.status
  }

  getProgress(): Progress {
    return this.progress
  }

  start(): void {
    this.status = Status.Uploading
    this.onChange(this)

    void this.upload()
  }

  async cancel(): Promise<void> {
    return UploadAPI.handleFetchError(async () => {
      const response = await axios.post(this.cancelURI)

      if (response.status !== 200) {
        UploadAPI.reportUnsuccessfulResponse(response, this.onError)

        return
      }

      this.status = Status.Canceled
      this.onChange(this)
    }, this.onError)
  }

  private async upload(): Promise<void> {
    const results: ProcessPayload[] = []

    for (const part of this.parts) {
      if (this.status === Status.Canceled) {
        return
      }

      const result = await this.uploadPart(part)

      if (!result) {
        return
      }

      results.push({
        // Parts are numbered from 1.
        part_id: part.index + 1,
        etag: result,
      })
    }

    this.onChange(this)
    void this.process(results)
  }

  private async process(payload: ProcessPayload[]): Promise<void> {
    return UploadAPI.handleFetchError(async () => {
      const response = await axios.post(this.processURI, payload)

      if (response.status !== 200) {
        UploadAPI.reportUnsuccessfulResponse(response, this.onError)

        return
      }

      this.status = Status.Completed
      this.onChange(this)
    }, this.onError)
  }

  private async uploadPart(
    part: InternalPart,
    attempt = 1,
  ): Promise<string | void> {
    return UploadAPI.handleFetchError(async () => {
      const response = await axios.put(
        part.url,
        UploadAPI.sliceFile(this.file, part.start, part.end + 1),
        {
          headers: {
            'Content-Type': '',
          },
          onUploadProgress: (axiosProgressEvent: AxiosProgressEvent) => {
            this.onUploadProgress(axiosProgressEvent.event)
          },
        },
      )

      if (response.status !== 200) {
        if (attempt < 7) {
          // Exponential delay starting from 1 second.
          const delay = 1000 * 2 ** (attempt - 1)

          // Wait...
          await new Promise((resolve) => setTimeout(resolve, delay))

          // ...and try upload again.
          return this.uploadPart(part, attempt + 1)
        }

        // Report a problem after all attempts.
        UploadAPI.reportUnsuccessfulResponse(response, this.onError)

        return
      }

      // All header names are lower cased.
      // https://axios-http.com/docs/res_schema
      const ETag: string = response.headers['etag']

      // S3 ETag is wrapped in double quotes.
      const parsedETag = ETag.replace(/^"(.*)"$/, '$1')

      this.uploaded += part.end - part.start

      return parsedETag
    }, this.onError)
  }

  private onUploadProgress(event: ProgressEvent): void {
    if (!this.startedAt) {
      // Set the timestamp from the first progress event (in milliseconds).
      this.startedAt = event.timeStamp
    }

    // Total number of bytes transferred so far.
    const loadedBytes = this.uploaded + event.loaded

    // Elapsed time in milliseconds.
    const elapsedTime = event.timeStamp - this.startedAt
    // Number of bytes transferred per one millisecond.
    const bitrate = elapsedTime > 0 ? loadedBytes / elapsedTime : 0
    // The remaining time to complete the transfer.
    const remainingTime = Math.max(this.file.size / bitrate - elapsedTime, 0)

    this.progress = {
      // Bytes.
      uploaded: loadedBytes,
      // Bytes.
      total: this.file.size,
      // Milliseconds.
      elapsedTime: elapsedTime,
      // Bytes per one millisecond.
      bitrate: bitrate,
      // Milliseconds.
      remainingTime: remainingTime,
    }

    this.onChange(this)
  }

  static async initialize(config: ApiConfig): Promise<UploadAPI | null> {
    const {
      file,
      outputType,
      initializeURI,
      getProcessURI,
      getCancelURI,
      onChange,
      onError,
    } = config

    const maybeUploadAPI = await UploadAPI.handleFetchError(async () => {
      const response = await axios.post<InitUploadResponse>(initializeURI, {
        name: file.name,
        size: file.size,
        type: outputType,
      })

      if (response.status !== 200) {
        UploadAPI.reportUnsuccessfulResponse(response, onError)

        return null
      }

      const uploadConfig = {
        id: response.data.id,
        file,
        partSize: response.data.upload.part_size,
        parts: response.data.upload.parts.map((o) => ({
          id: o.part_id,
          url: o.url,
        })),
        processURI: getProcessURI(response.data.id),
        cancelURI: getCancelURI(response.data.id),
      }

      return new UploadAPI(uploadConfig, onChange, onError)
    }, onError)

    return maybeUploadAPI ?? null
  }

  private static sliceFile(file: File, start: number, end: number): Blob {
    // Start is an index into the Blob indicating the first byte to include
    // in the new Blob (0 is the first byte). End is an index
    // indicating the first byte not to include in the new Blob.

    return file.slice(start, end)
  }

  private static async handleFetchError<T>(
    fn: () => Promise<T>,
    onError: ErrorCallback,
  ): Promise<T | void> {
    try {
      return await fn()
    } catch (error: unknown) {
      UploadAPI.reportError(error, onError)
    }
  }

  private static reportUnsuccessfulResponse(
    response: AxiosResponse,
    onError: ErrorCallback,
  ): void {
    onError(response.status, response.statusText)
  }

  private static reportError(error: unknown, onError: ErrorCallback): void {
    if (isAxiosError(error)) {
      onError(error.status ?? HttpStatusCode.InternalServerError, error.message)
    } else if (typeof error === 'string') {
      onError(HttpStatusCode.InternalServerError, error)
    } else if (error instanceof Error) {
      onError(HttpStatusCode.InternalServerError, error.message)
    } else {
      onError(HttpStatusCode.InternalServerError, 'Unknown error')
    }
  }
}
