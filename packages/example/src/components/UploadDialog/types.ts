import type { OutputType } from '@maptiler/upload-js'

export type Props = {
  onConfirm: (outputType: OutputType | null) => void
  onClose: () => void
}
