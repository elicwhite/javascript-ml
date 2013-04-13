define(['knockout', 'dataModel', 'knn'], function(ko, DataModel, KNN) {
    return function viewModel(data) {
        "use strict";
        var self = this;

        var knn = new KNN(3);
        var classify;

        // This is the data we use
        self.data = ko.observableArray(data);

        // This is the data we want to classify
        self.toClassify = ko.observableArray();

        self.initialize = function() {
            for (var i = 0; i < 20; i++) {
                addRandomClassify();   
            }

            recalculate();
        };

        function addRandomClassify() {
            self.toClassify.push(new DataModel(getRandomClassify()));
        }

        function getRandomClassify() {
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);

            return {
                "features": [r, g, b]
            };
        }

        self.data.subscribe(function(newValue) {
            recalculate();
        });

        function recalculate() {
            classify = knn.setData(self.data());

            self.toClassify().forEach(function(toProcess) {
                toProcess.match(classify(toProcess));
            });

            console.log("go");
        }

        // Accept a classified item as gold
        self.accept = function(item) {
            self.toClassify.remove(item);

            if (self.toClassify().length < 20) {
                addRandomClassify();
            }

            self.data.push({features: item.observeFeatures(), value: item.match()});
        };

        // Remove gold and put it in classify
        self.remove = function(item) {
            self.toClassify.push(new DataModel(item));
            self.data.remove(item);
        };
    };
});