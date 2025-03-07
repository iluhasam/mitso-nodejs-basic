import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filePath = path.join(__dirname, 'files/fileToRead.txt');

    try {
        const content = await fs.readFile(filePath, 'utf8');
        console.log(content);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await read();