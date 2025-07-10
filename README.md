<p align="center">
<a href="https://docs.maptiler.com/upload-js/">official page →</a><br>
  <img src="images/maptiler-logo.svg" width="350px">
</p>

<p align="center" style="color: #AAA">
  A TypeScript & Javascript library for handling large file uploads with multipart support and progress tracking. The Upload JS provides a simple way to upload files to MapTiler, track progress, and handle errors.
</p>

<p align="center">
  <img src="images/JS-logo.svg" width="20px">
  <img src="images/TS-logo.svg" width="20px">
  <img src="https://img.shields.io/twitter/follow/maptiler?style=social"></img>
</p>

# Upload API Library

A TypeScript & Javascript library for handling large file uploads with multipart support and progress tracking. The Upload JS provides a simple way to upload files to MapTiler, track progress, and handle errors.

Please refer to the [Official Upload JS Library Documentation](https://docs.maptiler.com/upload-js/) for all its features, use cases, API reference, and more.

## Using `UploadAPI`

The `UploadAPI` class provides a simple way to upload files to MapTiler, track progress, and handle errors.
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

> [!CAUTION]
> 🚨 **The service token must never be exposed to the client/browser.** It should only be used on the server.

> [!TIP]
> See `packages/example/app/api` how easily the functions can be integrated into your ecosystem.

### Client-side
```ts
import { HttpStatusCode } from 'axios'
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
  onError: (error: HttpStatusCode, message: string, api: UploadAPI | null) => {
    alert(`${error}, ${message}`)
  },
  // These API endpoints must point to your backend, which can use the provided server-side helpers to
  // proxy requests to  MapTiler.
  initializeURI: datasetID ? `/api/${datasetID}/ingest` : '/api/ingest',
  getProcessURI: (id) => `/api/ingest/${id}/process`,
  getCancelURI: (id) => `/api/ingest/${id}/cancel`,
  // Auto upload, default = true. Upload will start immediately.
  autoUpload: false,
})

// You can now start the upload:
api.start()

// or cancel the upload:
api.cancel()
```

## `UploadAPI` Public Methods

The [API reference](https://docs.maptiler.com/upload-js/api/) documents every object, classes, types and method available in the MapTiler Upload JS.

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
