import type { HttpStatusCode } from 'axios'

export type ProcessPayload = { part_id: number; etag: string }
export type GenericError = { error: string; status: HttpStatusCode }

export type OutputType =
  | 'raster_tileset'
  | 'raster_terrain'
  | 'vector_features'
  | 'vector_terrain'
  | 'vector_tileset'
