#! /usr/bin/env node

const execSync = require('child_process').execSync

function latestFromTags() {
  return execSync('git describe --tags --abbrev=0')
    .toString()
    .trim()
    .replace(/^v/, '')
}

console.log(latestFromTags())
