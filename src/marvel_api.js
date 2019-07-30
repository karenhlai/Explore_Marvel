var CryptoJS = require("crypto-js");
const fetch = require('node-fetch');
// import key from '../config/dev_keys';

key = {
  publicKey: '5bb20da87b09c9516bd86c9c5d2bcdad',
  privateKey: '54bb3c8fc2734c8a92ca99cd532c76bb63a85c24',
  ts: Date.now()
};


let hash = CryptoJS.MD5(`${key.ts}${key.privateKey}${key.publicKey}`);
let myData = [];

function filterEvents(json) {
  Object.values(json.data.results).forEach((event) => {
    myData.push(
      {
        ['name']: event.title, 
        // ['description']: event.description,
        ['children']: [event.characters.items],
        // ['thumbnails']: event.thumbnail
      }
    )
  });
  return myData;
};


fetch(`http://gateway.marvel.com/v1/public/events?limit=1&ts=${key.ts}&apikey=${key.publicKey}&hash=${hash}`)
  .then(res => res.json())
  .then(myJson => filterEvents(myJson))
  // .then(myJson => appendCharactersToEvents(myJson))
  .catch(err => console.log(err));

