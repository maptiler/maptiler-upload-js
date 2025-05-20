'use client'
import { UploadAPI } from '@maptiler/upload-js'
import Box from '@mui/joy/Box'
import Sheet from '@mui/joy/Sheet'
import { useCallback, useState } from 'react'
import { UploadButton } from '@example/components/UploadButton'
import { UploadDialog } from '@example/components/UploadDialog'
import { UploadTable } from '@example/components/UploadTable'
import type { ApiConfig, OutputType } from '@maptiler/upload-js'
import type { ChangeEvent } from 'react'

export const Content = () => {
  const [uploadAPIs, setUploadAPIs] = useState<Array<UploadAPI>>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const addFile = useCallback(
    async (
      file: File,
      outputType: OutputType | null,
      datasetID: string | null,
    ) => {
      // Callback which will be called on each update.
      const onChange = (api: UploadAPI) => {
        setUploadAPIs((prev) => prev.map((o) => (o.id === api.id ? api : o)))
      }

      const config: ApiConfig = {
        file,
        outputType,
        onChange,
        onError: (error, message) => alert(`${error}, ${message}`),
        initializeURI: datasetID
          ? `/api/ingest/${datasetID}/replace`
          : '/api/ingest',
        getProcessURI: (id) => `/api/ingest/${id}/process`,
        getCancelURI: (id) => `/api/ingest/${id}/cancel`,
      }

      // The UploadAPI class is a wrapper around the upload process.
      const api = await UploadAPI.initialize(config)

      if (!api) {
        return
      }

      // Insert a new file to the state.
      setUploadAPIs((prev) => prev.concat(api))
      setIsLoading(false)
    },
    [],
  )

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement
    const files: File[] = Array.from(input.files ?? [])

    setFiles(files)
    setIsOpen(true)
  }

  const onConfirm = (
    outputType: OutputType | null,
    datasetID: string | null,
  ) => {
    files.forEach((file) => addFile(file, outputType, datasetID))
    setIsOpen(false)
    setIsLoading(true)
  }

  return (
    <Sheet
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '0 5vw',
      }}
    >
      <Box>
        {uploadAPIs.length > 0 && <UploadTable uploadAPIs={uploadAPIs} />}
        <Sheet
          sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '32px 0',
          }}
        >
          {isLoading ? (
            'File is being added...'
          ) : (
            <UploadButton onChange={onFileSelect} />
          )}
        </Sheet>
      </Box>
      {isOpen && (
        <UploadDialog onConfirm={onConfirm} onClose={() => setIsOpen(false)} />
      )}
    </Sheet>
  )
}
