import prettyBytes from 'pretty-bytes'
import { Action } from '@example/components/UploadTable/Row/Action'
import type { Props } from './types'

export const Row = ({ uploadConfig }: Props) => {
  const progress = uploadConfig.getProgress()

  const percentUploaded = Math.floor((progress.uploaded / progress.total) * 100)

  return (
    <tr key={uploadConfig.id}>
      <td>{uploadConfig.file.name}</td>
      <td>{uploadConfig.file.type}</td>
      <td>{prettyBytes(uploadConfig.file.size)}</td>
      <td>{uploadConfig.getStatus()}</td>
      <td>{percentUploaded}%</td>
      <td>{progress.bitrate.toFixed(3)}</td>
      <td>{(progress.elapsedTime / 1000).toFixed(3)}</td>
      <td>{(progress.remainingTime / 1000).toFixed(3)}</td>
      <td>
        <Action uploadConfig={uploadConfig} />
      </td>
    </tr>
  )
}
