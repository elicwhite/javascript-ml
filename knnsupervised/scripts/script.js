window.onload = function() {
    "use strict";

    var classify;

    d3.json("data.json", function(error, data) {
        var knn = new KNN(3);
        classify = knn.setData(data);

        run();
        setInterval(run, 5000);
    });

    function run(origData) {
        var r = Math.round(Math.random() * 255);
        var g = Math.round(Math.random() * 255);
        var b = Math.round(Math.random() * 255);

        var match = classify({
            "features": [r, g, b]
        });

        document.getElementById("r").innerText = r;
        document.getElementById("g").innerText = g;
        document.getElementById("b").innerText = b;
        document.getElementById("swatch").style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
        document.getElementById("match").style.backgroundColor = match;
        document.getElementById("matchName").innerText = match;
    }
};

/*
Format of JSON:

[{
    "features": [2, 5, 7],
    "value": "red"
}, {
    "features": [3, 7, 1],
    "value": "green"
}]

*/