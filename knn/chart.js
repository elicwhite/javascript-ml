function Chart(canvas) {
    "use strict";
    var self = this;

    var context = canvas.getContext('2d');

    var xPadding = 30;
    var yPadding = 30;

    var chartWidth = canvas.width - xPadding;
    var chartHeight = canvas.height - yPadding;

    self.initialize = function(data) {
        console.log("Setting up chart");

        self.drawAxis();
        var range = getRange(data);
        console.log(range);

        logLabels(range);
    };


    self.drawAxis = function() {
        function setAxisPen() {
            context.lineWidth = 2;
            context.strokeStyle = '#333';
            context.font = 'italic 8pt sans-serif';
            context.textAlign = "center";
        }

        setAxisPen();

        // Draw the axises
        context.beginPath();
        context.moveTo(xPadding, 0);
        context.lineTo(xPadding, canvas.height - yPadding);
        context.lineTo(canvas.width, canvas.height - yPadding);
        context.stroke();
    };

    function getRange(data) {
        var range = {
            minY: data[0].Y,
            maxY: data[0].Y,
            minX: data[0].X,
            maxX: data[0].X
        };

        for (var i = 0; i < data.length; i++) {
            range.minY = Math.min(range.minY, data[i].Y);
            range.maxY = Math.max(range.maxY, data[i].Y);
            range.minX = Math.min(range.minX, data[i].X);
            range.maxX = Math.max(range.minX, data[i].X);
        }

        return range;
    }

    function logLabels(range) {
        context.fillText(range.minX, xPadding+5, chartHeight+15)
    }
}