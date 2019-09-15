 //d3
 export function updateChart(comparisonData, compareHeros) {
   // handle static data
   const selection = d3.select("#chart")
     .selectAll(".bar")
     .data(comparisonData)
     // old data scraped, style new data
     .style("height", function (d) {
       return d + "px";
     })
     .style("margin-top", function (d) {
       return (100 - d) + "px";
     });

   // handle dynamic data - enter (new data), old date is updated
   /* When our dataset contains more items than there are avai. DOM els, the 
   surplus data items are stored in a subset of this selection 
   called the 'enter' selection - CHAIRS METAPHOR - First 4 are Update, Last is Enter */
   selection.enter()
     .append("div").attr("class", "bar")
     .text((d) => d)
    //  STYLE THE NUMBER TEXTS
     .style("height", function (d) {
       return d + "px";
     })
     .style("margin-top", function (d) {
       return (100 - d) + "px";
     })

     // handle click to remove - new graph is entered,
     .on("click", function (e, i) {
       const reAddHero = compareHeros[i];
       document.getElementById(reAddHero).disabled = false;

       comparisonData.splice(i, 1);
       console.log(comparisonData)
       console.log(compareHeros)
       updateChart(comparisonData)
     })
     .append("div").attr("class", "x-axis")
      .text(compareHeros[i]);

   // then selected item is removed, and update graph will show
   // exit() leaving old data behind
   // remove() remove old dataset

   selection.exit().remove();
 };