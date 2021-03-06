"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var skeleton = {
  description: "",
  external_url: "",
  image: "",
  name: "",
  attributes: [],
  background_color: "",
  animation_url: "",
  youtube_url: "",
  exif: [],
  cmoa: [],
  imageInfo: [],
  artist: [],
  chainData: [],
  dao: []
};

var exif = {
  date_record_created: ""
};

var cmoa = {
  title: "",
  creation_date: "",
  create_date_earliest: "",
  creation_date_latest: "",
  medium: "",
  accession_number: "",
  id: "",
  credit_line: "",
  date_acquired: "",
  department: "",
  physical_location: "",
  item_width: "",
  item_heigh: "",
  item_Depth: "",
  item_diameter: "",
  web_url: "",
  provenance_text: "",
  classification: "",
  date_record_created: ""
};

var imageInfo = {
  image_url: [],
  image_rights: [],
  date_record_created: ""
};

var artist = {
  artist_id: "",
  party: "",
  full_name: "",
  cited_name: "",
  role: "",
  nationality: "",
  birth_date: "",
  death_date: "",
  birth_place: "",
  death_place: "",
  date_record_created: ""
};

var chainData = {
  block_added: "",
  vote_added: "",
  vote_source_address: "",
  address_approvals: [],
  date_record_created: ""
};

var dao = {
  management_addresses: [],
  date_record_created: ""
};

//Documentation on OpenSea Metadata Guidline: https://docs.opensea.io/docs/metadata-standards
//Documentation on CMOA data: https://github.com/cmoa/collection

// const skeleton = {
//   description: "Friendly OpenSea Creature that enjoys long swims in the ocean.",
//   external_url: "https://openseacreatures.io/3",
//   image: "https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png",
//   name: "Dave Starbelly",
//   attributes: []
// };

exports.skeleton = skeleton;
exports.cmoa = cmoa;
exports.exif = exif;
exports.imageInfo = imageInfo;
exports.artist = artist;
exports.chainData = chainData;
exports.dao = dao;