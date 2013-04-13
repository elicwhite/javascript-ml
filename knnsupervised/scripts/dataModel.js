define(['knockout'], function(ko) {
    return function dataModel(data) {
        "use strict";
        var self = this;

        // This is the data we use in KNN. Not an observable
        self.features = data.features;

        // These will never update, but we need them for databinding
        self.observeFeatures = ko.observableArray(self.features);

        self.match = ko.observable("");

        self.getStyle = ko.computed(function() {
            return "rgb(" + self.observeFeatures()[0] + "," + self.observeFeatures()[1] + "," + self.observeFeatures()[2] + ")";
        });
    };
});