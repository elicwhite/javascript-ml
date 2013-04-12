window.onload = function() {
    "use strict";

    var ele = document.getElementById("chart");

    var chart = new Chart(ele);

    var classify;

    d3.tsv("data.tsv", function(error, data) {
        classify = chart.load(data);
        run();
    });

    function run() {
        classify({rooms: 6, area: 1200, rmtype: "classify"});
    }
};