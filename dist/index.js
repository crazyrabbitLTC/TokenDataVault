"use strict";

var _fileUtils = require("./src/fileUtils");

var start = async function start() {
  var array = (0, _fileUtils.fileArray)("/Users/dennison/Documents/TokenDataVault");

  var sortedArray = (0, _fileUtils.sortFiles)(array, ["jpg", "tiff"]);
  console.log("This is a sorted array: ", sortedArray);

  var metadata = sortedArray.forEach(function (file) {
    console.log(JSON.stringify((0, _fileUtils.extractEXIF)(file)));
  });
};

start();