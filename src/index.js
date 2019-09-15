import _ from 'lodash';
import { updateChart } from './chart';
import data from '../data/marvel_data'

document.addEventListener('DOMContentLoaded', (e) => {
  // add heroNames to dropdown list
  let dropdown = document.getElementById("heroName");
  for (let i = 0; i < data.length; i++) {
    let hero = data[i];
    let option = document.createElement("option");
    option.text = hero.name;
    option.id = hero.name;
    dropdown.append(option);
  }
  
  let compareHeros = [];
  let compareApps = [];

  // add selectedHeros to array
  $("#selectHero").on("submit", (e) => {
    e.preventDefault();
    
    const $input = $("#heroName");
    const selectedHero = $input.val();
    // console.log(selectedHero);

    for (let i = 0; i < data.length; i++) {
      let hero = data[i]; 

      if (hero.name === selectedHero) {
        compareHeros.push(hero.name);
        compareApps.push(hero.appearances);
        document.getElementById(hero.name).disabled = true;
      }
    }
    updateChart(compareApps, compareHeros);
  });
  
});