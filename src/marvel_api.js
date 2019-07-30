var CryptoJS = require("crypto-js");
const fetch = require('node-fetch');
// import key from '../config/dev_keys';


let hash = CryptoJS.MD5(`${key.ts}${key.privateKey}${key.publicKey}`);
let myData = [];

function filterEvents(json) {
  let alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

  Object.values(json.data.results).forEach((event, idx) => {
    myData.push(
      {
        ['id']: idx, 
        ['title']: event.title, 
        ['description']: event.description
      }
    );
    // event.characters.items.forEach((character, jdx) => {
    //   myData.nodes.push(
    //     {
    //       ['charId']: jdx, 
    //       ['title']: character.name
    //     }
    //   );
    // })
  });
  return myData;
};

fetch(`http://gateway.marvel.com/v1/public/events?limit=3&ts=${key.ts}&apikey=${key.publicKey}&hash=${hash}`)
  .then(res => res.json())
  .then(myJson => filterEvents(myJson))
  .then(myJson => console.log(myJson))
  .catch(err => console.log(err));

