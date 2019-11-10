"use strict";

import {
    fileArray,
    sortFiles,
    extractEXIF,
    addFileHash
} from "./src/fileUtils";

import config from "./config";
import {skeleton, cmoa, exif, imageInfo, artist, chainData} from "./src/metadataConfig";

const start = async () => {
    let array = fileArray(config.path);

    let sortedArray = sortFiles(array, config.imageTypes);

    let exifMetadata = sortedArray.map(file => extractEXIF(file));

    let dataWithHash = exifMetadata.map(file => {
        return { ...file, keccak256: addFileHash(file), cmoa, imageInfo, artist, chainData };
    });

    console.log(dataWithHash);
};

start();
