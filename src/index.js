import _ from 'lodash';
import { updateChart } from './chart';
import data from '../data/marvel_data'
import { arch } from 'os';

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
    // console.log(selectedCategory)
    updateChart(selectedHeros, selectedCategory);
  };

    // place listener to each radio
    $("#moviesRadio").click(function () {
      $('#moviesRadio').attr("checked", true);
      selectedCategory = "movies";
      handleUpdate();
    });

    $("#comicsRadio").click(function () {
      $('#comicsRadio').attr("checked", true);
      selectedCategory = "comics";
      handleUpdate();
    });

    $('input:radio').on('change', (e) => {
      let selectedCategory = e.currentTarget.value;

      if (selectedCategory === "movies") {
        $('#comicsRadio').attr("checked", false);
      } else if (selectedCategory === "comics") {
        $('#moviesRadio').attr("checked", false);
      }
    });

  // add selectedHeros to array
  $("#selectHero").on("submit", (e) => {
    e.preventDefault();
    handleUpdate();
  });
  
});