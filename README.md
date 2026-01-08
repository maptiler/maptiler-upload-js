<img src="https://raw.githubusercontent.com/maptiler/maptiler-sdk-kotlin/main/Examples/maptiler-logo.png" alt="Company Logo" height="32"/>

# Upload API Library

A TypeScript & Javascript library for handling large file uploads with multipart support and progress tracking. The Upload JS provides a simple way to upload files to MapTiler, track progress, and handle errors.

[![](https://img.shields.io/npm/v/@maptiler/upload-js?style=for-the-badge&labelColor=D3DBEC&color=f2f6ff&logo=npm&logoColor=333359)](https://www.npmjs.com/package/@maptiler/upload-js) ![](https://img.shields.io/badge/-white?style=for-the-badge&logo=javascript)![](https://img.shields.io/badge/-white?style=for-the-badge&logo=typescript)

---

📖 [Documentation](https://docs.maptiler.com/upload-js/) &nbsp; 📦 [NPM Package](https://www.npmjs.com/package/@maptiler/upload-js) &nbsp; 🌐 [Website](https://docs.maptiler.com/upload-js/) &nbsp; 🔑 [Get API Key](https://cloud.maptiler.com/account/keys/)

---

<br>

<details> <summary><b>Table of Contents</b></summary>
<ul>
<li><a href="#-installation">Installation</a></li>
<li><a href="#-basic-usage">Basic Usage</a></li>
<li><a href="#-related-examples">Examples</a></li>
<li><a href="#-api-reference">API Reference</a></li>
<li><a href="#-support">Support</a></li>
<li><a href="#-contributing">Contributing</a></li>
<li><a href="#-license">License</a></li>
<li><a href="#-acknowledgements">Acknowledgements</a></li>
</ul>
</details>

## 📦 Installation

### NPM

```shell
npm install @maptiler/upload-js
```

### Yarn

```shell
yarn add @maptiler/upload-js
```

<br>

## 🚀 Basic Usage

The `UploadAPI` class provides a simple way to upload files to MapTiler, track progress, and handle errors.
You can use it in any JavaScript or TypeScript project.

### Server-side

You have to implement the API endpoints in your backend to proxy requests to MapTiler.

The library expose helper functions designed to simplify server-side integration with MapTiler. They provide
ready-to-use route handlers for initializing, processing, replacing, and canceling uploads, so you don’t have to write
the fetch logic yourself.

```ts
import {
  initUpload,
  processUpload,
  replaceUpload,
  cancelUpload,
} from "@maptiler/upload-js";
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
import { HttpStatusCode } from "axios";
import { ApiConfig, OutputType, UploadAPI } from "@maptiler/upload-js";

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
    alert(`${error}, ${message}`);
  },
  // These API endpoints must point to your backend, which can use the provided server-side helpers to
  // proxy requests to  MapTiler.
  initializeURI: datasetID ? `/api/${datasetID}/ingest` : "/api/ingest",
  getProcessURI: (id) => `/api/ingest/${id}/process`,
  getCancelURI: (id) => `/api/ingest/${id}/cancel`,
  // Auto upload, default = true. Upload will start immediately.
  autoUpload: false,
});

// You can now start the upload:
api.start();

// or cancel the upload:
api.cancel();
```

<br>

## 💡 Related Examples

This repository contains a [Next.js example](https://github.com/maptiler/maptiler-upload-js/tree/main/packages/example) showing how easily you can use this library.

### 🔑 Prerequisites

Create a `.env` file in the `packages/example` directory and add your MapTiler service token:

```
MAPTILER_SERVICE_TOKEN=<your-own-service-token>
```

You can find your service token in your [MapTiler account](https://cloud.maptiler.com/account/credentials/).

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

<br>

## 📘 API Reference

For detailed guides, API reference, and advanced examples, visit our comprehensive documentation:

[API documentation](https://docs.maptiler.com/upload-js/api/)

<br>

## 💬 Support

- 📚 [Documentation](https://docs.maptiler.com/upload-js/) - Comprehensive guides and API reference
- ✉️ [Contact us](https://maptiler.com/contact) - Get in touch or submit a request
- 🐦 [Twitter/X](https://twitter.com/maptiler) - Follow us for updates

<br>

---

<br>

## 🤝 Contributing

We love contributions from the community! Whether it's bug reports, feature requests, or pull requests, all contributions are welcome:

- Fork the repository and create your branch from `main`
- If you've added code, add tests that cover your changes
- Ensure your code follows our style guidelines
- Give your pull request a clear, descriptive summary
- Open a Pull Request with a comprehensive description

<br>

## 📄 License

This project is licensed under the BSD 3-Clause License – see the [LICENSE](./LICENSE) file for details.

<br>

<p align="center" style="margin-top:20px;margin-bottom:20px;"> <a href="https://cloud.maptiler.com/account/keys/" style="display:inline-block;padding:12px 32px;background:#F2F6FF;color:#000;font-weight:bold;border-radius:6px;text-decoration:none;"> Get Your API Key <sup style="background-color:#0000ff;color:#fff;padding:2px 6px;font-size:12px;border-radius:3px;">FREE</sup><br /> <span style="font-size:90%;font-weight:400;">Start building with 100,000 free map loads per month ・ No credit card required.</span> </a> </p>

<br>

<p align="center"> 💜 Made with love by the <a href="https://www.maptiler.com/">MapTiler</a> team <br />
<p align="center">
  <a href="https://www.maptiler.com/">Website</a> •
  <a href="https://docs.maptiler.com/upload-js/">Documentation</a> •
  <a href="https://github.com/maptiler/maptiler-upload-js">GitHub</a>
</p>
