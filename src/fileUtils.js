"use strict";

import fs from "fs";
import path from "path";
import readChunk from "read-chunk";
import fileType from "file-type";
import Parser from "exif-parser";
import keccak256 from "keccak256";

const fileArray = directoryPath => {
  let directoryContents = fs.readdirSync(directoryPath);

  return directoryContents
    .filter(file => fs.statSync(file).isFile())
    .map(file => {
      return { fileName: file, filePath: path.join(directoryPath, file) };
    });
};

const sortFiles = (filePathArray, fileTypeArray) => {
  return filePathArray.filter(file => {
    return fileTypeArray.includes(getFileType(file.filePath).ext);
  });
};

const getFileType = file => {
  let example = { ext: null, mime: null };
  return fileType(readChunk.sync(file, 0, fileType.minimumBytes)) || example;
};

//should only receive jpg or tiff files
const extractEXIF = (imageFile, exifData = {}) => {
  const parser = Parser.create(fs.readFileSync(imageFile.filePath));

  try {
    exifData = { ...imageFile, exif: { ...parser.parse() } };
  } catch (err) {
    // got invalid data, handle error
    console.log(err);
    return exifData;
  }

  return exifData;
};

const addFileHash = fileObj => {
  let buffer = fs.readFileSync(fileObj.filePath);
  return keccak256(buffer).toString("hex");
};

export { fileArray, sortFiles, extractEXIF, addFileHash };
