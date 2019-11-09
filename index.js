"use strict";

import {fileArray, sortFiles} from "./src/fileUtils";

const start = async () => {
  let array =  fileArray("/Users/dennison/Documents/TokenDataVault");

  console.log(array)
  let sortedArray = sortFiles(array, ["jpg", "tiff"])
  console.log("This is a sorted array: ", sortedArray)
}

start()