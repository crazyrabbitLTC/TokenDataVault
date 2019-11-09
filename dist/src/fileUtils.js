"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortFiles = exports.fileArray = undefined;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _readChunk = require("read-chunk");

var _readChunk2 = _interopRequireDefault(_readChunk);

var _fileType = require("file-type");

var _fileType2 = _interopRequireDefault(_fileType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileArray = function fileArray(directoryPath) {
  var directoryContents = _fs2.default.readdirSync(directoryPath);

  return directoryContents.filter(function (item) {
    return _fs2.default.statSync(item).isFile();
  }).map(function (item) {
    return _path2.default.join(directoryPath, item);
  });
};

var sortFiles = function sortFiles(filePathArray, fileTypeArray) {
  return filePathArray.filter(function (file) {
    return fileTypeArray.includes(getFileType(file).ext);
  });
};

var getFileType = function getFileType(file) {
  var example = { ext: null, mime: null };
  return (0, _fileType2.default)(_readChunk2.default.sync(file, 0, _fileType2.default.minimumBytes)) || example;
};
exports.fileArray = fileArray;
exports.sortFiles = sortFiles;