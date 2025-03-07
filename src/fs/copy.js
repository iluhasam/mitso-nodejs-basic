import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
    // Write your code here
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const sourceDir = path.join(__dirname, 'files');
    const destDir = path.join(__dirname, 'files_copy');
    try {
        await fs.access(sourceDir);
        try {
            await fs.access(destDir);
            throw new Error('FS operation failed');
        } catch (error) {
            if (error.code !== 'ENOENT') {
                throw new Error('FS operation failed');
            }
        }
        await fs.mkdir(destDir);
        const files = await fs.readdir(sourceDir);
        for (const file of files) {
            const sourcePath = path.join(sourceDir, file);
            const destPath = path.join(destDir, file);
            await fs.copyFile(sourcePath, destPath);
        }
    } catch (error) {
        if (error.message === 'FS operation failed' || error.code === 'ENOENT') {
            throw new Error('FS operation failed');
        }
        throw error;
    }
};

await copy();
