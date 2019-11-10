"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fileUtils = require("./src/fileUtils");

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _metadataConfig = require("./src/metadataConfig");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = async function start() {
    var array = (0, _fileUtils.fileArray)(_config2.default.path);

    var sortedArray = (0, _fileUtils.sortFiles)(array, _config2.default.imageTypes);

    var exifMetadata = sortedArray.map(function (file) {
        return (0, _fileUtils.extractEXIF)(file);
    });

    var dataWithHash = exifMetadata.map(function (file) {
        return _extends({}, file, { keccak256: (0, _fileUtils.addFileHash)(file), cmoa: _metadataConfig.cmoa, imageInfo: _metadataConfig.imageInfo, artist: _metadataConfig.artist, chainData: _metadataConfig.chainData });
    });

    console.log(dataWithHash);
};

start();