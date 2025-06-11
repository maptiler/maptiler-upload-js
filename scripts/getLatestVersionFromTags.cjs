#! /usr/bin/env node

const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const { execSync } = require('child_process');

function getLatestVersionFromTags() {
  try {
    return execSync('git describe --tags --abbrev=0')
        .toString()
        .trim()
        .replace(/^v/, '');
  } catch (error) {
    console.error('Error getting latest version from Git tags:', error.message);
    return '0.0.0';
  }
}

// Expect the package directory as an argument.
const packageDir = process.argv[2];

if (!packageDir) {
  console.error('Usage: ./scripts/getLatestVersionFromTags.cjs <path/to/package>');
  process.exit(1);
}

const packageJsonPath = join(process.cwd(), packageDir, 'package.json');

try {
  const newVersion = getLatestVersionFromTags();
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

  if (packageJson.version === newVersion) {
    console.log(`Version in ${packageDir}/package.json is already ${newVersion}. No update needed.`);
  } else {
    packageJson.version = newVersion;
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Updated version in ${packageDir}/package.json to ${newVersion}`);
  }
} catch (error) {
  console.error(`Failed to update package.json for ${packageDir}:`, error.message);
  process.exit(1);
}
