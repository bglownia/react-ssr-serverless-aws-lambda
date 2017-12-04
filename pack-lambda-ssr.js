const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

const basePath = path.resolve(path.join(__dirname, 'dist', 'lambda-ssr'));
const output = fs.createWriteStream(path.resolve(`${basePath}.zip`));
const archive = archiver('zip');

output.on('close', () => {
  console.log(`${archive.pointer()} total bytes`);
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory(basePath, false);
archive.finalize();
