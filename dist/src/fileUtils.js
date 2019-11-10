"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addFileHash = exports.extractEXIF = exports.sortFiles = exports.fileArray = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _readChunk = require("read-chunk");

var _readChunk2 = _interopRequireDefault(_readChunk);

var _fileType = require("file-type");

var _fileType2 = _interopRequireDefault(_fileType);

var _exifParser = require("exif-parser");

var _exifParser2 = _interopRequireDefault(_exifParser);

var _keccak = require("keccak256");

var _keccak2 = _interopRequireDefault(_keccak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileArray = function fileArray(directoryPath) {
  var directoryContents = _fs2.default.readdirSync(directoryPath);

  return directoryContents.filter(function (file) {
    return _fs2.default.statSync(file).isFile();
  }).map(function (file) {
    return { fileName: file, filePath: _path2.default.join(directoryPath, file) };
  });
};

var sortFiles = function sortFiles(filePathArray, fileTypeArray) {
  return filePathArray.filter(function (file) {
    return fileTypeArray.includes(getFileType(file.filePath).ext);
  });
};

var getFileType = function getFileType(file) {
  var example = { ext: null, mime: null };
  return (0, _fileType2.default)(_readChunk2.default.sync(file, 0, _fileType2.default.minimumBytes)) || example;
};

//should only receive jpg or tiff files
var extractEXIF = function extractEXIF(imageFile) {
  var exifData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var parser = _exifParser2.default.create(_fs2.default.readFileSync(imageFile.filePath));

  try {
    exifData = _extends({}, imageFile, { exif: _extends({}, parser.parse()) });
  } catch (err) {
    // got invalid data, handle error
    console.log(err);
    return exifData;
  }

  return exifData;
};

var addFileHash = function addFileHash(fileObj) {
  var buffer = _fs2.default.readFileSync(fileObj.filePath);
  return (0, _keccak2.default)(buffer).toString("hex");
};

exports.fileArray = fileArray;
exports.sortFiles = sortFiles;
exports.extractEXIF = extractEXIF;
exports.addFileHash = addFileHash;