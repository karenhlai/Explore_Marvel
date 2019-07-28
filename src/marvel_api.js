var CryptoJS = require("crypto-js");
const fetch = require('node-fetch');
import key from '../config/dev_keys';

let hash = CryptoJS.MD5(`${key.ts}${key.privateKey}${key.publicKey}`);
let marvel_data = {};

fetch(`http://gateway.marvel.com/v1/public/characters?limit=3&ts=${key.ts}&apikey=5bb20da87b09c9516bd86c9c5d2bcdad&hash=${hash}`)
  .then(res => res.json())
  // .then(myJson => filterCharacters(myJson))
  .then(myJson => console.log(myJson))
  .catch(err => console.log(err));

