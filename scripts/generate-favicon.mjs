import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";

const iconSource = new URL("../src/app/icon.svg", import.meta.url);
const faviconTarget = new URL("../src/app/favicon.ico", import.meta.url);
const sizes = [16, 32, 48, 64, 256];

const svg = await readFile(iconSource);
const images = await Promise.all(sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()));
const directorySize = 6 + images.length * 16;
const header = Buffer.alloc(directorySize);

header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(images.length, 4);

let imageOffset = directorySize;
images.forEach((image, index) => {
    const size = sizes[index];
    const entryOffset = 6 + index * 16;
    header.writeUInt8(size === 256 ? 0 : size, entryOffset);
    header.writeUInt8(size === 256 ? 0 : size, entryOffset + 1);
    header.writeUInt8(0, entryOffset + 2);
    header.writeUInt8(0, entryOffset + 3);
    header.writeUInt16LE(1, entryOffset + 4);
    header.writeUInt16LE(32, entryOffset + 6);
    header.writeUInt32LE(image.length, entryOffset + 8);
    header.writeUInt32LE(imageOffset, entryOffset + 12);
    imageOffset += image.length;
});

await writeFile(faviconTarget, Buffer.concat([header, ...images]));
