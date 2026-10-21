import type { HttpStatusCode } from 'axios'

export type ProcessPayload = { part_id: number; etag: string }
export type GenericError = { error: string; status: HttpStatusCode }

export type OutputType =
  | 'raster_tileset'
  | 'raster_terrain'
  | 'vector_features'
  | 'vector_terrain'
  | 'vector_tileset'
  | 'image'
  | 'splat_model'

export type Location = { lat: number; lon: number }

export type AutoGeoreferenceError = {
  category: string
  code: string
  message: string
}

export type AutoGeoreferenceResponse = {
  id: string
  input_document_id: string
  output_document_id: string | null
  state: 'processing' | 'completed' | 'canceled' | 'failed'
  errors: AutoGeoreferenceError[] | null
  progress: number
}
