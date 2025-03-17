import path from "path";
import { createReadStream } from 'fs';

const read = async () => {
    // Write your code here
    const filePath = path.resolve('src/streams/files/fileToRead.txt');
    const stream = createReadStream(filePath, 'utf-8');
    stream.pipe(process.stdout);
};

await read();