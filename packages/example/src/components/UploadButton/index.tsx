import Button from '@mui/joy/Button'
import { VisuallyHiddenInput } from './styles'
import type { Props } from './types'

export const UploadButton = ({ onChange }: Props) => {
  return (
    <Button component="label" tabIndex={-1} variant="outlined" color="neutral">
      Choose File
      <VisuallyHiddenInput type="file" onChange={onChange} value="" />
    </Button>
  )
}
