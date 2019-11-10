"use strict";

var EthCrypto = require("eth-crypto");
var web3Utils = require("web3-utils");

var _require = require("merkletreejs"),
    MerkleTree = _require.MerkleTree;

var keccak256 = require("keccak256");
var buf2hex = function buf2hex(x) {
  return "0x" + x.toString("hex");
};

var signWord = async function signWord(word, privateKey) {
  try {
    var message = EthCrypto.hash.keccak256([{ type: "string", value: word }]);
    var signature = await EthCrypto.sign(privateKey, message);
    return signature;
  } catch (error) {
    console.log(error);
  }
};

var leaves = ["love", "happiness", "ethereum"].map(function (x) {
  return keccak256(x);
}, "hex");

var badLeaves = ["love", "emotion", "ethereum"].map(function (x) {
  return keccak256(x);
}, "hex");

var tree = new MerkleTree(leaves, keccak256);
var badTree = new MerkleTree(badLeaves, keccak256);

var root = Buffer.from(tree.getRoot(), "hex");

var leaf = Buffer.from(keccak256("love"), "hex");
var badLeaf = Buffer.from(keccak256("emotion"), "hex");

var proof = tree.getProof(leaf).map(function (x) {
  return buf2hex(x.data);
});
var badProof = tree.getProof(badLeaf).map(function (x) {
  return buf2hex(x.data);
});

var positions = tree.getProof(leaf).map(function (x) {
  return x.position === "right" ? 1 : 0;
});

var badPositions = badTree.getProof(badLeaf).map(function (x) {
  return x.position === "right" ? 1 : 0;
});

var validWord = "love";
var invalidWord = "diabolical";

module.exports = {
  validWord: validWord,
  invalidWord: invalidWord,
  signWord: signWord,
  leaves: leaves,
  badLeaves: badLeaves,
  tree: tree,
  badTree: badTree,
  root: root,
  leaf: leaf,
  badLeaf: badLeaf,
  proof: proof,
  badProof: badProof,
  positions: positions,
  badPositions: badPositions
};