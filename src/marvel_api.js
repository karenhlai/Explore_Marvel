var CryptoJS = require("crypto-js");
const fetch = require('node-fetch');
// import key from '../config/dev_keys';




let hash = CryptoJS.MD5(`${key.ts}${key.privateKey}${key.publicKey}`);
let myData = [];

function filterEvents(json) {
  Object.values(json.data.results).forEach((event, idx) => 
    myData.push(
      {
        ['name']: event.title, 
        // ['description']: event.description,
        ['children']: [],
        ['thumbnails']: event.thumbnail
      }
    )
  );
  return myData;
};

function appendCharactersToEvents(json) {
  Object.values(json.data.results).forEach((event) => {
    // console.log(event.characters.items)
    event.characters.items.forEach(characters =>
      console.log(characters.name)
    )
  })
};


fetch(`http://gateway.marvel.com/v1/public/events?limit=1&ts=${key.ts}&apikey=${key.publicKey}&hash=${hash}`)
  .then(res => res.json())
  // .then(myJson => filterEvents(myJson))
  .then(myJson => appendCharactersToEvents(myJson))
  .catch(err => console.log(err));

