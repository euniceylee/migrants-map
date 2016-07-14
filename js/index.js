var width = 960,
    height = 500;

var projection = d3.geo.mercator()
    .translate([480, 340])
    .scale(308);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var path = d3.geo.path()
    .projection(projection);

var g = svg.append("g");

// load and display the World
d3.json("world-topo-min.json", function(error, topology) {

// load and display the cities
d3.csv("final-refugee-athletes.csv", function(data) {
    svg.selectAll("circle")
       .data(data)
       .enter()
       .append("circle") 
       .attr("cx", function(d) {
               return projection([d.lon, d.lat])[0];
       })
       .attr("cy", function(d) {
               return projection([d.lon, d.lat])[1];
       })
       .attr("r", 1.5)
       .style("fill", "black")
       .style("stroke", "black");
});

//color-coordinate the refugee countries???
//label the countries using AI2HTML??

//this projects everything
g.selectAll("path")
      .data(topojson.object(topology, topology.objects.countries)
          .geometries)
    .enter()
      .append("path")
      .attr("d", path)
});

// zoom and pan
// var zoom = d3.behavior.zoom()
//     .on("zoom",function() {
//         g.attr("transform","translate("+ 
//             d3.event.translate.join(",")+")scale("+d3.event.scale+")");
//         g.selectAll("circle")
//             .attr("d", path.projection(projection));
//         g.selectAll("path")  
//             .attr("d", path.projection(projection)); 

//   });

// svg.call(zoom)
