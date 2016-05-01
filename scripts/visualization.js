function checkBeforeVisualization(){
  $('#vs_error_manage').empty();
  var canSearch = true;
  var user = welcome;
  var startingdate = $('#vs_startingdate_manage').val();
  var endingdate = $('#vs_endingdate_manage').val();
  if (user == null) {
    $('#vs_error_manage').append('<span class="error">Error:</span> Please try to login first! <br>');
    canSearch = false;
  }
  if (startingdate == ''){
    $('#vs_error_manage').append('<span class="error">Error:</span> Please enter the startingdate for the data you want to search! <br>');
    canSearch = false;
  }
  if(endingdate == ''){
    $('#vs_error_manage').append('<span class="error">Error:</span> Please enter the endingdate for the data you want to search! <br>');
    canSearch = false;
  }
  if(startingdate > endingdate){
    $('#vs_error_manage').append('<span class="error">Error:</span> Please make the startingdate ealier than endingdate! <br>');
    canSearch = false;
  }
  return canSearch;
}

$(document).ready(function() {
  $('#visualize').click(function() {
	console.log("Visual TBD.");	
	if(checkBeforeVisualization()) {
	var dataType = $("input[name='vs_data']:checked").val();
 
	console.log("Visualizing " + dataType);
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
	    width = 960 - margin.left - margin.right,
	    height = 500 - margin.top - margin.bottom;

	var formatDate = d3.time.format("%Y-%m-%d");

	var x = d3.time.scale()
	    .range([0, width]);

	var y = d3.scale.linear()
	    .range([height, 0]);

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left");

		var line = d3.svg.line()
		    .interpolate("basis")
		    .x(function(d) { return x(d.time); })
		    .y(function(d) { return y(d[dataType]); });

		d3.select("svg").remove();
		var svg = d3.select("#visual").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		d3.json("php/visualization_query.php?user="+ welcome + '&' + $('#vs_form').serialize(), function(error, data) {
		console.log("jsonparse");
		console.log(error, data);
		    if (error) throw error;		    

		    data.forEach(function(d) {
			console.log(d.time + "@" + d.value);
			d.time = formatDate.parse(d.time);
			d[dataType] = +d[dataType];
		    });

		  x.domain(d3.extent(data, function(d) { return d.time; }));
		  y.domain(d3.extent(data, function(d) { return d[dataType]; }));

		  svg.append("g")
		      .attr("class", "x axis")
		      .attr("transform", "translate(0," + height + ")")
		      .call(xAxis);

		  svg.append("g")
		      .attr("class", "y axis")
		      .call(yAxis)
		    .append("text")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .style("text-anchor", "end")
		      .text(dataType);

		  svg.append("path")
		      .datum(data)
		      .attr("class", "d3-pathline")
		      .attr("d", line);

		});

	}
	return false;
  });
});
