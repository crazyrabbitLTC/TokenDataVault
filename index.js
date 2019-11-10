"use strict";

import {
    fileArray,
    sortFiles,
    extractEXIF,
    addFileHash
} from "./src/fileUtils";

import config from "./config";
import {
    skeleton,
    cmoa,
    exif,
    imageInfo,
    artist,
    chainData
} from "./src/metadataConfig";

import EthCrypto from "eth-crypto";
import keccak256 from "keccak256";

const start = async () => {
    const array = fileArray(config.path);

    const sortedArray = sortFiles(array, config.imageTypes);

    const exifMetadata = sortedArray.map(file => extractEXIF(file));

    const dataWithHash = exifMetadata.map(file => {
        return {
            ...file,
            keccak256: addFileHash(file),
            cmoa: [],
            imageInfo: [],
            artist: [],
            chainData: []
        };
    });

    const onlyDataToHash = dataWithHash.map(item => {
        let obj = { fileName: item.fileName, hash: item.keccak256 };
        return obj;
    });

    const hashItemsInArray = array => {
        return array.map(item => {
            return keccak256(JSON.stringify(item));
        });
    };

    const result = hashItemsInArray(onlyDataToHash);
    console.log(result);
};

start();
