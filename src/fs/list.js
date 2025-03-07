import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const list = async () => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dirPath = path.join(__dirname, 'files');

    try {
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch (error) {
        if (error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }

};

await list();