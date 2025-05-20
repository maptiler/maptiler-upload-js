import { Status } from '@maptiler/upload-js'
import Button from '@mui/joy/Button'
import type { Props } from './types'

export const Action = ({ uploadAPI }: Props) => {
  if (uploadAPI.getStatus() === Status.Added) {
    return (
      <Button onClick={() => uploadAPI.start()} size="sm">
        Start
      </Button>
    )
  }

  if (uploadAPI.getStatus() === Status.Completed) {
    return 'Completed'
  }

  return 'Loading...'
}
