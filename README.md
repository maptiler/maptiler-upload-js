# Upload API Library
A TypeScript library for handling large file uploads with multipart support and progress tracking.

## ✨ Features
- Multipart file upload support.
- Progress tracking with detailed statistics.
- Error handling and status reporting.
- React integration.
- TypeScript type safety.
- Customizable upload endpoints.
- Support for different output types.
- Cancel upload functionality.

### 📈 Progress Tracking
The library provides detailed progress information including:
- Uploaded bytes
- Total file size
- Elapsed time
- Bitrate
- Estimated remaining time

## Using `UploadAPI`
The UploadAPI class provides a simple way to upload files to MapTiler, track progress, and handle errors.
You can use it in any JavaScript or TypeScript project.

### Installation
#### NPM
```shell
npm install @maptiler/upload-js
```
#### Yarn
```shell
yarn add @maptiler/upload-js
```

### Server-side
You have to implement the API endpoints in your backend to proxy requests to MapTiler.

The library expose helper functions designed to simplify server-side integration with MapTiler. They provide
ready-to-use route handlers for initializing, processing, replacing, and canceling uploads, so you don’t have to write
the fetch logic yourself.

```ts
import { initUpload,processUpload, replaceUpload, cancelUpload } from '@maptiler/upload-js'
```

All functions require `serviceToken` – the MapTiler service token is a private key used to authenticate your
application with MapTiler services. This token grants access to your MapTiler account and allows your server to
perform actions such as uploading files, managing datasets, and more.

> 🚨 **The service token must never be exposed to the client/browser.** It should only be used on the server.

> See `packages/example/app/api` how easily the functions can be integrated into your ecosystem.

### Client-side
```ts
import { ApiConfig, OutputType, UploadAPI } from '@maptiler/upload-js'

// The UploadAPI class is a wrapper around the upload process.
const api = await UploadAPI.initialize({
  file, // File
  outputType, // OutputType | null
  onChange: (api: UploadAPI) => {
    // Update your UI with progress or status.
    // api.getProgress()
    // api.getStatus())
  },
  onError: (error, message) => alert(`${error}, ${message}`),
  // These API endpoints must point to your backend, which can use the provided server-side helpers to
  // proxy requests to  MapTiler.
  initializeURI: datasetID ? `/api/${datasetID}/ingest` : '/api/ingest',
  getProcessURI: (id) => `/api/ingest/${id}/process`,
  getCancelURI: (id) => `/api/ingest/${id}/cancel`,
})

// You can now start the upload:
api.start()

// or cancel the upload:
api.cancel()
```

## `UploadAPI` Public Methods
### `getStatus(): Status`
Returns the current upload status.

### `getProgress(): Progress`
Returns the current upload progress metrics.

### `start(): void`
Starts the file upload. Triggers the `onChange` callback.

### `cancel(): Promise<void>`
Cancels the upload by making a cancellation request to the backend. Triggers the `onChange` callback.

## `UploadAPI` Types
### `Status`
```ts
enum Status {
  Added = 'Added',
  Uploading = 'Uploading',
  Completed = 'Completed',
  Canceled = 'Canceled',
  Failed = 'Failed',
}
```

### `Progress`
```ts
type Progress = {
  // Total file size (bytes).
  total: number
  // Already uploaded (bytes).
  uploaded: number | null
  // Elapsed time (milliseconds).
  elapsedTime: number | null
  // Bytes per one millisecond.
  bitrate: number | null
  // Remaining time (milliseconds).
  remainingTime: number | null
}
```

### `OutputType`
Force output type (if not set, then output type is tileset determined based on input file).
```ts
type OutputType =
  | 'raster_tileset'
  | 'raster_terrain'
  | 'vector_features'
  | 'vector_terrain'
  | 'vector_tileset'
```

## 🧪 Example
This repository contains a Next.js example showing how easily you can use this library.

### 🔑 Prerequisites
Create a .env file in the packages/example directory and add your MapTiler service token:
```
MAPTILER_SERVICE_TOKEN=<your-own-service-token>
```

You can find your service token in your MapTiler account.

### 🐳 Run Development Containers
You can run the entire application inside a development container without installing any dependencies locally.

### 🖥️ Run Locally
1. Install Node.js (v18.18 or later).
2. Install Yarn – see the [official guide](https://yarnpkg.com/getting-started/install).
3. Install dependencies:
```shell
yarn install
```

### 🚀 Run example
Start the example application in development mode:
```shell
yarn example [-p PORT]
```

Open your browser at http://localhost:3000 (or your chosen port).
