window.onload = function() {
    "use strict";

    var ele = document.getElementById("chart");

    var chart = new Chart(ele);

    var classify;

    d3.tsv("data.tsv", function(error, data) {
        classify = chart.load(data);
        run();
        setInterval(run, 5000);
    });

    function run() {
        var r = Math.random()*10+1;
        var a = Math.random()*1800+200;

        classify({rooms: r, area: a, rmtype: "classify"});
    }
};