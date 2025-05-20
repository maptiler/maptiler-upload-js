import prettyBytes from 'pretty-bytes'
import { Action } from '@example/components/UploadTable/Row/Action'
import type { Props } from './types'

export const Row = ({ uploadAPI }: Props) => {
  const progress = uploadAPI.getProgress()

  const percentUploaded = Math.floor((progress.uploaded / progress.total) * 100)

  return (
    <tr key={uploadAPI.id}>
      <td>{uploadAPI.file.name}</td>
      <td>{prettyBytes(uploadAPI.file.size)}</td>
      <td>{uploadAPI.getStatus()}</td>
      <td>{percentUploaded}%</td>
      <td>{prettyBytes(progress.bitrate)}/s</td>
      <td>{Math.round(progress.elapsedTime / 1000)} s</td>
      <td>{Math.round(progress.remainingTime / 1000)} s</td>
      <td>
        <Action uploadConfig={uploadAPI} />
      </td>
    </tr>
  )
}
