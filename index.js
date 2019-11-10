"use strict";

import {
    fileArray,
    sortFiles,
    extractEXIF,
    addFileHash,
    buf2hex
} from "./src/fileUtils";
import config from "./config";
import keccak256 from "keccak256";
import MerkleTree from "merkletreejs";

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

    const leaves = hashItemsInArray(onlyDataToHash);

    const tree = new MerkleTree(leaves, keccak256);
    
    const root = Buffer.from(tree.getRoot(), "hex");

    const sampleLeaf = Buffer.from(keccak256(JSON.stringify(onlyDataToHash[0])), "hex");

    const proof = tree.getProof(sampleLeaf).map(x => buf2hex(x.data));
    console.log(sampleLeaf);
};

start();
