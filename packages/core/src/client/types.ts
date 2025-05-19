import type { UploadAPI } from './index'
import type { OutputType } from '@upload/shared/types'
import type { HttpStatusCode } from 'axios'

export type ChangeCallback = (api: UploadAPI) => void
export type ErrorCallback = (code: HttpStatusCode, message: string) => void

export type Config = {
  file: File
  outputType: OutputType | null
  initializeURI: string
  getProcessURI: (uploadID: string) => string
  getCancelURI: (uploadID: string) => string
  onChange: ChangeCallback
  onError: ErrorCallback
}

export type UploadConfig = {
  id: string
  file: File
  partSize: number
  parts: Part[]
  processURI: string
  cancelURI: string
}

export type Part = {
  id: number
  url: string
}

export type Progress = {
  uploaded: number
  total: number
  elapsedTime: number
  bitrate: number
  remainingTime: number
}

export type InternalPart = {
  index: number
  url: string
  start: number
  end: number
}

export type UploadedPart = {
  index: number
  etag: string
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
