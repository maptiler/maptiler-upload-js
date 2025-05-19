import { Status } from '@maptiler/upload-js/build/client/enums'
import Button from '@mui/joy/Button'
import type { Props } from './types'

export const Action = ({ uploadConfig }: Props) => {
  if (uploadConfig.getStatus() === Status.Added) {
    return <Button onClick={() => uploadConfig.start()}>Start</Button>
  }

  if (uploadConfig.getStatus() === Status.Completed) {
    return <Button disabled>Completed</Button>
  }

  return <Button loading />
}
