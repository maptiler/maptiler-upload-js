import type { UploadAPI } from './index'
import type { OutputType } from '@upload/shared/types'
import type { HttpStatusCode } from 'axios'

export type ChangeCallback = (api: UploadAPI) => void
export type ErrorCallback = (
  code: HttpStatusCode,
  message: string,
  api: UploadAPI | null,
) => void

export type ApiConfig = {
  file: File
  outputType: OutputType | null
  initializeURI: string
  getProcessURI: (uploadID: string) => string
  getCancelURI: (uploadID: string) => string
  onChange: ChangeCallback
  onError: ErrorCallback
  autoUpload?: boolean
}

export type UploadConfig = {
  id: string
  file: File
  partSize: number
  parts: Part[]
  processURI: string
  cancelURI: string
  autoUpload: boolean
}

export type Part = {
  id: number
  url: string
}

export type Progress = {
  total: number
  uploaded: number | null
  elapsedTime: number | null
  bitrate: number | null
  remainingTime: number | null
}

export type InternalPart = {
  index: number
  url: string
  start: number
  end: number
}

export type ApiError = {
  type: string
  message: string
}

export type UploadPart = {
  part_id: number
  url: string
}

export type InitUploadResponse = {
  id: string
  state: 'upload' | 'processing' | 'completed' | 'canceled' | 'failed'
  filename: string
  size: number
  progress: number
  errors: ApiError[] | null
  upload: {
    part_size: number
    parts: UploadPart[]
  }
}
