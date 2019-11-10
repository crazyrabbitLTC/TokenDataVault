"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fileUtils = require("./src/fileUtils");

var start = async function start() {
  var array = (0, _fileUtils.fileArray)("/Users/dennison/Documents/TokenDataVault");

  var sortedArray = (0, _fileUtils.sortFiles)(array, ["jpg", "tiff"]);

  var exifMetadata = sortedArray.map(function (file) {
    return (0, _fileUtils.extractEXIF)(file);
  });

  //console.log(JSON.stringify(exifMetadata, null, 2));

  var dataWithHash = exifMetadata.map(function (file) {
    return _extends({}, file, { keccak256: (0, _fileUtils.addFileHash)(file) });
  });

  console.log(dataWithHash);
};

start();