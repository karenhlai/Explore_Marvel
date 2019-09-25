export function updateChart(selectedHeros, selectedCategory) {
  let reflected;
  reflected = selectedHeros;
  let category = selectedCategory;

  if (selectedCategory === "movies") {
    const selection = d3.select("#chart")
    .selectAll(".bar")
    .data(selectedHeros)
    // old data scraped, style new data
    .style("height", function (d) {
      return d.movies + "px";
    })
    .style("margin-top", function (d) {
      return (100 - d.movies) + "px";
    });
  // handle dynamic data - enter (new data), old date is updated
  /* When our dataset contains more items than there are avai. DOM els, the 
  surplus data items are stored in a subset of this selection 
  called the 'enter' selection - CHAIRS METAPHOR - First 4 are Update, Last is Enter */
  selection.enter()
    .append("div").attr("class", "bar")
    // .text((d) => d.movies)
    //  STYLE THE NUMBER TEXTS
    .style("height", function (d) {
      return d.movies + "px";
    })
    .style("margin-top", function (d) {
      return (100 - d.movies) + "px";
    })
    
    // handle click to remove - new graph is entered,
    .on("click", function (e, i) {
      const enableHero = e.name;
      document.getElementById(enableHero).disabled = false;
      document.getElementById(enableHero + " Label").remove();

      reflected.splice(i, 1);
      category = "movies";
      updateChart(reflected, "movies");
    });

  // then selected item is removed, and update graph will show
  // exit() leaving old data behind
  // remove() remove old dataset
  selection.exit().remove();
  } else {
    const selection= d3.select("#chart")
    .selectAll(".bar")
    .data(selectedHeros)
    // old data scraped, style new data
    .style("height", function (d) {
      return d.comics + "px";
    })
    .style("margin-top", function (d) {
      return (100 - d.comics) + "px";
    });

  // handle dynamic data - enter (new data), old date is updated
  /* When our dataset contains more items than there are avai. DOM els, the 
  surplus data items are stored in a subset of this selection 
  called the 'enter' selection - CHAIRS METAPHOR - First 4 are Update, Last is Enter */
  selection.enter()
    .append("div").attr("class", "bar")
    // .text((d) =>  d.comics)
    //  STYLE THE NUMBER TEXTS
    .style("height", function (d) {
      return d.comics + "px";
    })
    .style("margin-top", function (d) {
      return (100 - d.comics) + "px";
    })

    // handle click to remove - new graph is entered,
    .on("click", function (e, i) {
      let enableHero = e.name;
      document.getElementById(enableHero).disabled = false;
      document.getElementById(enableHero + " Label").remove();

      reflected.splice(i, 1);
      category = "comics"
      updateChart(reflected, "comics");
    });

  // then selected item is removed, and update graph will show
  // exit() leaving old data behind
  // remove() remove old dataset

  selection.exit().remove();
  }
  // updateChart(reflected, category)
};