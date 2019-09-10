var CryptoJS = require("crypto-js");
const fetch = require('node-fetch');
const key = require('../config/dev_keys');

let hash = CryptoJS.MD5(`${key.ts}${key.privateKey}${key.publicKey}`);
let myData = [];

function filterEvents(json) {
  Object.values(json.data.results).forEach((event) => {
    myData.push({
      ['name']: event.title,
      // ['description']: event.description,
      // ['thumbnails']: event.thumbnail
      ['children']: event.characters.items,
    });
    // event.characters.items.forEach((character) => 
    // );
  });
  console.log(myData)
  console.log(myData[1].children)
  return myData;
};


fetch(`http://gateway.marvel.com/v1/public/events?limit=2&offset=2&ts=${key.ts}&apikey=${key.publicKey}&hash=${hash}`)
  .then(res => res.json())
  .then(myJson => filterEvents(myJson))
  .catch(err => console.log(err));

