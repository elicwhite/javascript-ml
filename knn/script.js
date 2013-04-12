window.onload = function() {
    "use strict";

    var chart = new Chart(document.getElementById("chart"));

    var rms = document.getElementById("rms");
    var area = document.getElementById("area");
    var cls = document.getElementById("cls");
    var classify;

    d3.tsv("data.tsv", function(error, data) {
        classify = chart.load(data);
        run();
        setInterval(run, 5000);
    });

    function run() {
        var r = Math.round(Math.random()*10+1);
        var a = Math.round(Math.random()*1800+200);

        var result = classify({rooms: r, area: a, rmtype: "classify"});

        rms.innerText = r;
        area.innerText = a;
        cls.innerText = result;
    }
};