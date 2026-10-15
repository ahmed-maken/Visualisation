const CSV_URL = 'https://raw.githubusercontent.com/chumo/Data2Serve/master/transition_clusters.csv';

d3.csv(CSV_URL).then(function(data) {
    d3.select("#status")
      .text("Loaded! Click anywhere inside the white box to animate the transition.");

    // 1. Draw the circles at their initial positions (Xi, Yi)
    const circles = d3.select("#viz")
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function(d) { return parseFloat(d.Xi); })
      .attr("cy", function(d) { return parseFloat(d.Yi); })
      .attr("r", 4)
      .attr("fill", function(d) { return d.color; });

    // 2. When the SVG box is clicked, transition the dots to (Xf, Yf)
    d3.select("#viz").on("click", function() {
        d3.select("#status").text("Transitioning to final positions (Xf, Yf)...");

        circles.transition()
          .duration(2000) // Takes 2 seconds to complete the move
          .attr("cx", function(d) { return parseFloat(d.Xf); })
          .attr("cy", function(d) { return parseFloat(d.Yf); });
    });
});