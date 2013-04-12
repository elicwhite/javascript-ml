window.onload = function() {
    "use strict";

    var ele = document.getElementById("chart");

    var chart = new Chart(ele);

    var json = [[5.5, 2.6, 'a'],[3.2, 1.1, 'b'],[4.6, 2.1, 'a']];

    chart.load(json);
};