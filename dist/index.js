"use strict";

var _fileUtils = require("./src/fileUtils");

var start = async function start() {
  var array = (0, _fileUtils.fileArray)("/Users/dennison/Documents/TokenDataVault");

  console.log(array);
  var sortedArray = (0, _fileUtils.sortFiles)(array, ["jpg", "tiff"]);
  console.log("This is a sorted array: ", sortedArray);
};

start();