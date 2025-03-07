import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const rename = async () => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const oldPath = path.join(__dirname, 'files/wrongFilename.txt');
    const newPath = path.join(__dirname, 'files/properFilename.md');

    try {
        await fs.access(oldPath);
        try {
            await fs.access(newPath);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }
        await fs.rename(oldPath, newPath);
    } catch (error) {
        if (error.code === 'ENOENT' || error.message === 'FS operation failed') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await rename();