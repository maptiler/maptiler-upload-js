import prettyBytes from 'pretty-bytes'
import { Action } from '@example/components/UploadTable/Row/Action'
import type { Props } from './types'

export const Row = ({ uploadAPI }: Props) => {
  const progress = uploadAPI.getProgress()

  const percentUploaded = progress.uploaded
    ? Math.floor((progress.uploaded / progress.total) * 100)
    : 0

  const bitrate =
    progress.bitrate !== null ? `${prettyBytes(progress.bitrate)}/s` : 'N/A'

  const elapsedTime =
    progress.elapsedTime !== null
      ? `${Math.round(progress.elapsedTime / 1000)}s`
      : 'N/A'

  const remainingTime =
    progress.remainingTime !== null
      ? `${Math.round(progress.remainingTime / 1000)}s`
      : 'N/A'

  return (
    <tr key={uploadAPI.id}>
      <td>{uploadAPI.file.name}</td>
      <td>{prettyBytes(uploadAPI.file.size)}</td>
      <td>{uploadAPI.getStatus()}</td>
      <td>{percentUploaded}%</td>
      <td>{bitrate}</td>
      <td>{elapsedTime}</td>
      <td>{remainingTime}</td>
      <td>
        <Action uploadAPI={uploadAPI} />
      </td>
    </tr>
  )
}
