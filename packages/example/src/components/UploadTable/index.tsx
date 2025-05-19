import Sheet from '@mui/joy/Sheet'
import Table from '@mui/joy/Table'
import { Row } from './Row'
import type { Props } from './types'

export const UploadTable = ({ uploadConfigs }: Props) => {
  return (
    <Sheet
      sx={{
        maxHeight: '256px',
        overflow: 'auto',
      }}
    >
      <Table
        aria-label="basic table"
        sx={{ '& tr > *:last-child': { textAlign: 'right' } }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Size</th>
            <th>Status</th>
            <th>Uploaded</th>
            <th>Bitrate</th>
            <th>Elapsed</th>
            <th>Remaining</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {uploadConfigs.map((config) => (
            <Row key={config.id} uploadConfig={config} />
          ))}
        </tbody>
      </Table>
    </Sheet>
  )
}
