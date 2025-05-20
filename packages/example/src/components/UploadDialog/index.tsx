import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Option from '@mui/joy/Option'
import Select from '@mui/joy/Select'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import { useState } from 'react'
import type { OutputType } from '@maptiler/upload-js'
import type { SyntheticEvent } from 'react'
import type { Props } from './types'

export const UploadDialog = ({ onConfirm, onClose }: Props) => {
  const [outputType, setOutputType] = useState<OutputType | null>(null)
  const [datasetID, setDatasetID] = useState<string>('')

  const onTypeChange = (
    event: SyntheticEvent | null,
    value: OutputType | null,
  ) => {
    setOutputType(value)
  }

  const onSubmit = () => {
    onConfirm(outputType, datasetID.length ? datasetID : null)
  }

  return (
    <Modal
      open={true}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        sx={{ maxWidth: 360, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} size="sm" />
        <Typography
          component="h2"
          id="modal-title"
          level="title-md"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
          Output type
        </Typography>
        <Typography textColor="text.tertiary" sx={{ fontSize: '12px', mb: 1 }}>
          Force output type (if not set, then output type is tileset determined
          based on input file).
        </Typography>
        <Select
          onChange={onTypeChange}
          value={outputType}
          placeholder="Select type"
          size="sm"
          sx={{ mb: 1 }}
        >
          <Option value="raster_tileset">Raster Tileset</Option>
          <Option value="raster_terrain">Raster Terrain</Option>
          <Option value="vector_features">Vector Features</Option>
          <Option value="vector_terrain">Vector Terrain</Option>
          <Option value="vector_tileset">Vector Tileset</Option>
        </Select>
        <Typography textColor="text.tertiary" sx={{ fontSize: '12px', mb: 1 }}>
          If you want to replace existing dataset, enter its ID.
        </Typography>
        <Input
          onChange={(event) => setDatasetID(event.target.value)}
          value={datasetID}
        />
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            gap: 1,
            justifyContent: 'flex-end',
          }}
        >
          <Button
            type="button"
            variant="outlined"
            color="neutral"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="button" onClick={onSubmit}>
            Confirm
          </Button>
        </Box>
      </Sheet>
    </Modal>
  )
}
