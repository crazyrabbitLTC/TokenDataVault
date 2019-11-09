"use strict";

import { fileArray, sortFiles, extractEXIF } from "./src/fileUtils";

const start = async () => {
  let array = fileArray("/Users/dennison/Documents/TokenDataVault");

  let sortedArray = sortFiles(array, ["jpg", "tiff"]);
  console.log("This is a sorted array: ", sortedArray);

  let metadata = sortedArray.forEach(file => {
    console.log(JSON.stringify(extractEXIF(file)));
  });


};

start();
