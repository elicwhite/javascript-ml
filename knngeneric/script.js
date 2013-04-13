window.onload = function() {
    "use strict";

    var classify;

    d3.json("data.json", function(error, data) {
        var knn = new KNN(3);
        classify = knn.setData(data);

        run();
    });

    function run(origData) {
        console.log(classify({
            "features": [1, 2, 3]
        }));
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