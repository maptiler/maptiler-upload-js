#! /usr/bin/env node

const fs = require('fs')
const { join } = require('path')

const parentDirectory = join(__dirname, '../../../')

fs.copyFileSync(
  join(parentDirectory, 'README.md'),
  join(parentDirectory, './packages/core/README.md'),
)
fs.copyFileSync(
  join(parentDirectory, 'LICENSE'),
  join(parentDirectory, './packages/core/LICENSE'),
)
