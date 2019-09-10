// import _ from 'lodash';
// import chart from './chart';
// import marvel_api from "./marvel_api";
var CryptoJS = require("crypto-js");
const key = require('../config/dev_keys');

let hash = CryptoJS.MD5(`${key.ts}${key.privateKey}${key.publicKey}`);

document.addEventListener('DOMContentLoaded', (e) => {
  let req = new XMLHttpRequest();
  var name = document.getElementById('heroName').value;
  debugger
  let web = `http://gateway.marvel.com/v1/public/characters?name=${name}&ts=${key.ts}&apikey=${key.publicKey}&hash=${hash}`;
  
  document.getElementById('submit').addEventListener('click', (e) => {
    document.getElementById('heroName').textContent = "" ; 
    document.getElementById('description').textContent = "" ;
  });
  
  req.open('GET', web, true);
  
  
  req.setRequestHeader('Content-Type', 'application/json');
  req.addEventListener('load', function () {
    if (req.status >= 200 && req.status < 400) {
      let result = JSON.parse(req.responseText);
      debugger
      document.getElementById('name').textContent = result.name;
      document.getElementById('description').textContent = result.description;
    }

    e.preventDefault();
  });

  req.send(null);
});
