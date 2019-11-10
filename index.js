"use strict"

import {
    fileArray,
    sortFiles,
    extractEXIF,
    addFileHash,
    buf2hex,
    hashItemsInArray
} from "./src/fileUtils"
import config from "./config"
import keccak256 from "keccak256"

import MerkleTree, {
    checkProof,
    merkleRoot,
    checkProofSolidityFactory
} from "merkle-tree-solidity"

const start = async () => {
    const array = fileArray(config.path)
    const sortedArray = sortFiles(array, config.imageTypes)
    const exifMetadata = sortedArray.map(file => extractEXIF(file))
    const dataWithHash = exifMetadata.map(file => {
        return {
            ...file,
            keccak256: addFileHash(file),
            cmoa: [],
            imageInfo: [],
            artist: [],
            chainData: []
        }
    })

    const onlyDataToHash = dataWithHash.map(item => {
        let obj = { fileName: item.fileName, hash: item.keccak256 }
        return obj
    })

    const leaves2 = hashItemsInArray(onlyDataToHash)

    const elements = onlyDataToHash.map(e => keccak256(JSON.stringify(e)))

    const merkleTree = new MerkleTree(elements)

    const root = merkleTree.getRoot()

    const proof = merkleTree.getProof(elements[0])

    console.log(checkProof(proof, root, elements[0]))
}

start()
