window.onload = function() {
    "use strict";

    var data = [{
        X: 1,
        Y: 12
    }, {
        X: 3,
        Y: 28
    }, {
        X: 2,
        Y: 18
    }, {
        X: 4,
        Y: 34
    }, {
        X: 3,
        Y: 40
    }];


    var graph = document.getElementById("canvas");
    var chart = new Chart(graph);
    chart.initialize(data);

    /*
    var c = graph.getContext('2d');


    c.lineWidth = 2;
    c.strokeStyle = '#333';
    c.font = 'italic 8pt sans-serif';
    c.textAlign = "center";

    // Draw the axises
    c.beginPath();
    c.moveTo(xPadding, 0);
    c.lineTo(xPadding, graph.height - yPadding);
    c.lineTo(graph.width, graph.height - yPadding);
    c.stroke();

    // Draw the X value texts
    for (var i = 0; i < data.values.length; i++) {
        c.fillText(data.values[i].X, getXPixel(i), graph.height - yPadding + 20);
    }

    // Draw the Y value texts
    c.textAlign = "right";
    c.textBaseline = "middle";

    for (var i = 0; i < getMaxY(); i += 10) {
        c.fillText(i, xPadding - 10, getYPixel(i));
    }

    c.strokeStyle = '#f00';

    // Draw the line graph
    c.beginPath();
    c.moveTo(getXPixel(0), getYPixel(data.values[0].Y));
    for (var i = 1; i < data.values.length; i++) {
        c.lineTo(getXPixel(i), getYPixel(data.values[i].Y));
    }
    c.stroke();

    // Draw the dots
    c.fillStyle = '#333';

    for (var i = 0; i < data.values.length; i++) {
        c.beginPath();
        c.arc(getXPixel(i), getYPixel(data.values[i].Y), 4, 0, Math.PI * 2, true);
        c.fill();
    }

    function getMaxY() {
        var max = 0;

        for (var i = 0; i < data.values.length; i++) {
            if (data.values[i].Y > max) {
                max = data.values[i].Y;
            }
        }

        max += 10 - max % 10;
        return max;
    }

    function getXPixel(val) {
        return ((graph.width - xPadding) / data.values.length) * val + (xPadding * 1.5);
    }

    function getYPixel(val) {
        return graph.height - (((graph.height - yPadding) / getMaxY()) * val) - yPadding;
    }
    */

};