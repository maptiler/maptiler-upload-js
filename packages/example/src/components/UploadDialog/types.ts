import type { OutputType } from '@maptiler/upload-js'

export type Props = {
  onConfirm: (
    outputType: OutputType | null,
    datasetID: string | null,
    projectID: string | null,
  ) => void
  onClose: () => void
}
