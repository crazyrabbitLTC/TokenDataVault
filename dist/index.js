"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fileUtils = require("./src/fileUtils");

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

var _metadataConfig = require("./src/metadataConfig");

var _ethCrypto = require("eth-crypto");

var _ethCrypto2 = _interopRequireDefault(_ethCrypto);

var _keccak = require("keccak256");

var _keccak2 = _interopRequireDefault(_keccak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = async function start() {
    var array = (0, _fileUtils.fileArray)(_config2.default.path);

    var sortedArray = (0, _fileUtils.sortFiles)(array, _config2.default.imageTypes);

    var exifMetadata = sortedArray.map(function (file) {
        return (0, _fileUtils.extractEXIF)(file);
    });

    var dataWithHash = exifMetadata.map(function (file) {
        return _extends({}, file, {
            keccak256: (0, _fileUtils.addFileHash)(file),
            cmoa: [],
            imageInfo: [],
            artist: [],
            chainData: []
        });
    });

    var onlyDataToHash = dataWithHash.map(function (item) {
        var obj = { fileName: item.fileName, hash: item.keccak256 };
        return obj;
    });

    var hashItemsInArray = function hashItemsInArray(array) {
        return array.map(function (item) {
            return (0, _keccak2.default)(JSON.stringify(item));
        });
    };

    var result = hashItemsInArray(onlyDataToHash);
    console.log(result);
};

start();