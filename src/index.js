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

  let selectedHeros = [];
  let selectedCategory = "movies";

  
  function handleUpdate() {
    const $input = $("#heroName");
    const selectedHero = $input.val();
    const $ul = $("ul");

    for (let i = 0; i < data.length; i++) {
      let hero = data[i];

      if (hero.name === selectedHero) {
        document.getElementById(hero.name).disabled = true;
        selectedHeros.push(hero);
        
        // add label
        const $li = $("<li></li>");
        $li.text(hero.name);
        $li.attr("id", `${hero.name} Label`);
        $ul.append($li);
      }
    }
  };

    // place listener to each radio
    $("#moviesRadio").click(function () {
      $('#moviesRadio').attr("checked", true);
      $('#comicsRadio').attr("checked", false);
      selectedCategory = "movies";
      updateChart(selectedHeros, "movies");
    });

    $("#comicsRadio").click(function () {
      $('#comicsRadio').attr("checked", true);
      $('#moviesRadio').attr("checked", false);
      selectedCategory = "comics";
      updateChart(selectedHeros, "comics");
    });

  // add selectedHeros to array
  $("#selectHero").on("submit", (e) => {
    e.preventDefault();
    handleUpdate();
    updateChart(selectedHeros, selectedCategory);
  });
  
});