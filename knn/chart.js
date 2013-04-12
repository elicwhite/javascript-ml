function Chart(ele) {
    "use strict";
    var self = this;


    var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 40
    };

    var width = ele.offsetWidth - margin.left - margin.right;
    var height = ele.offsetHeight - margin.top - margin.bottom;

    var x = d3.scale.linear().domain([0,1]).range([0, width]);
    var y = d3.scale.linear().domain([0,1]).range([height, 0]);

    var xNormal = d3.scale.linear().range([0, 1]);
    var yNormal = d3.scale.linear().range([0, 1]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis().scale(x).orient("bottom");
    var yAxis = d3.svg.axis().scale(y).orient("left");

    var svg = d3.select(ele).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    self.load = function() {
        d3.tsv("data.tsv", function(error, data) {
            data.forEach(function(d) {
                d.rooms = parseInt(d.rooms, 10);
                d.area = parseInt(d.area, 10);
            });

            var xExtended = extendPercent(d3.extent(data, function(d) {
                return d.rooms;
            }));

            var yExtended = extendPercent(d3.extent(data, function(d) {
                return d.area;
            }));

            xNormal.domain(xExtended);
            yNormal.domain(yExtended);

            var chartData = data.slice(0,-1);
            var classifyDot = data.slice(-1);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis)
                .append("text")
                .attr("class", "label")
                .attr("x", width)
                .attr("y", -6)
                .style("text-anchor", "end")
                .text("# of Rooms");

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Area (sq ft)");

            svg.selectAll(".dot")
                .data(chartData)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 3.5)
                .attr("cx", function(d) {
                return x(xNormal(d.rooms));
            })
                .attr("cy", function(d) {
                return y(yNormal(d.area));
            })
                .style("fill", function(d) {
                return color(d.rmtype);
            });

            svg.selectAll(".dot.classify")
                .data(classifyDot)
                .enter().append("circle")
                .attr("class", "dot classify")
                .attr("r", 3.5)
                .attr("cx", function(d) {
                return x(xNormal(d.rooms));
            })
                .attr("cy", function(d) {
                return y(yNormal(d.area));
            })
                .style("fill", function(d) {
                return color(d.rmtype);
            });


            var legend = svg.selectAll(".legend")
                .data(color.domain())
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d, i) {
                return "translate(0," + ((i * 20) + (2 * i)) + ")";
            });

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", color);

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(function(d) {
                return d;
            });
        });
    };

    // Extends an array by 10%

    function extendPercent(arr) {
        var diff = arr[1] - arr[0];
        diff = diff / 20.0;

        return [arr[0] - diff / 2, arr[1] + diff / 2];
    }
}