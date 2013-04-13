function KNN(k) {
    "use strict";
    var self = this;

    self.setData = function(origData) {
        return function(classify) {
            var data = origData.slice();
            data.push(classify);

            var featureRanges = calculateRanges(data);

            origData.forEach(function(element) {
                var sum = 0;
                for (var i = 0; i < element.features.length; i++) {
                    var diff = (classify.features[i] - element.features[i]);
                    sum += diff * diff;
                }

                element.distance = Math.sqrt(sum);
            });

            // All the nodes now have a distance

            // Sort by distance
            origData.sort(function(a, b) {
                return a.distance - b.distance;
            });

            // Get the k closesnt neighbors's type
            var types = {};
            for (var i = 0; i < Math.min(k, origData.length); i++) {
                if (!types[origData[i].value]) {
                    types[origData[i].value] = 0;
                }

                types[origData[i].value]++;
            }

            // What is the value with the most neighbors?
            var guess = {
                type: false,
                count: 0
            };
            for (var type in types) {
                if (types[type] > guess.count) {
                    guess.type = type;
                    guess.count = types[type];
                }
            }

            return guess.type;
        };
    };

    // Calculate the possible range of each feature

    function calculateRanges(data) {
        var featureRanges = [];

        var numFeatures = data[0].features.length;

        for (var i = 0; i < numFeatures; i++) {
            featureRanges[i] = d3.extent(data, getFeatureIndex(i));
        }

        return featureRanges;
    }

    // Used in d3.extent to get the range of each feature

    function getFeatureIndex(index) {
        return function(data) {
            return data.features[index];
        };
    }
}