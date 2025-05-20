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

## 📦 Installation
```bash
yarn add @maptiler/upload-js
```

## 🧪 Example
This repository contains a Next.js example showing how easily you can use this library.

### 🔑 Prerequisites
Create a .env file in the packages/example directory and add your MapTiler Cloud service token:
```
SERVICE_TOKEN=<your-own-service-token>
```

You can find your service token in your MapTiler Cloud account under Account → Credentials.

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
