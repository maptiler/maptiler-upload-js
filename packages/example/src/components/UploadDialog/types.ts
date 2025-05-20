import type { OutputType } from '@maptiler/upload-js'

export type Props = {
  onConfirm: (outputType: OutputType | null, datasetID: string | null) => void
  onClose: () => void
}
