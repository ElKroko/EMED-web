const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const FILE_PATH = path.join(__dirname, '../src/assets/images/pages/foto-4.heic');
const OUTPUT_PATH = path.join(__dirname, '../src/assets/images/pages/foto-4.jpg');

(async () => {
    try {
        console.log(`Reading ${FILE_PATH}...`);
        const inputBuffer = await readFile(FILE_PATH);

        console.log('Converting...');
        const outputBuffer = await convert({
            buffer: inputBuffer,
            format: 'JPEG',
            quality: 0.8
        });

        console.log(`Writing to ${OUTPUT_PATH}...`);
        await writeFile(OUTPUT_PATH, outputBuffer);
        console.log('Done!');
    } catch (error) {
        console.error('Error converting file:', error);
        process.exit(1);
    }
})();
