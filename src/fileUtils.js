"use strict";

import fs from "fs";
import path from "path";
import readChunk from "read-chunk";
import fileType from "file-type";

const fileArray = directoryPath => {
  let directoryContents = fs.readdirSync(directoryPath);

  return directoryContents
    .filter(item => fs.statSync(item).isFile())
    .map(item => path.join(directoryPath, item));
};

const sortFiles = (filePathArray, fileTypeArray) => {
  return filePathArray.filter(file => {
    return fileTypeArray.includes(getFileType(file).ext);
  });
};

const getFileType = file => {
  let example = { ext: null, mime: null };
  return fileType(readChunk.sync(file, 0, fileType.minimumBytes)) || example;
};

export { fileArray, sortFiles };
