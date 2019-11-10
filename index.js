"use strict";

import { fileArray, sortFiles, extractEXIF, addFileHash } from "./src/fileUtils";

const start = async () => {
  let array = fileArray("/Users/dennison/Documents/TokenDataVault");

  let sortedArray = sortFiles(array, ["jpg", "tiff"]);

  let exifMetadata = sortedArray.map(file => extractEXIF(file));

  //console.log(JSON.stringify(exifMetadata, null, 2));

  let dataWithHash = exifMetadata.map(file => {
    return {...file, keccak256: (addFileHash(file))}
  })

  console.log(dataWithHash);
};

start();
