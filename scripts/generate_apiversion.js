const fs = require('fs');
const { execSync } = require('child_process');

// Get the commit hash
const COMMIT_HASH = execSync('git rev-parse HEAD').toString().trim();
// Get the commit date
const COMMIT_DATE_STRING = execSync('git log -1 --format=%cd').toString().trim();
const COMMIT_DATE = new Date(COMMIT_DATE_STRING);
const COMMIT_DATE_UTC = COMMIT_DATE.toISOString();

// Read the package.json file to get the API version
const packageJson = require('../package.json');
const API_VERSION = packageJson.version;

// Get the current date in the required format
const DATE_VERSION = new Date().toISOString();

// Write the content to .apiversion file
const content = `commit_version=${COMMIT_HASH}\ncommit_date=${COMMIT_DATE_UTC}\napi_version=${API_VERSION}\ndate_version=${DATE_VERSION}`;
console.log('Content:', content);
fs.writeFileSync('./.apiversion', content);

console.log('.apiversion file generated successfully.');
