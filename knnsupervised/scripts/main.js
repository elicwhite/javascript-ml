require.config({
    paths: {
        'knockout': 'knockout-2.2.1'
    }
});

require(["jquery", "knockout", "viewModel"], function($, ko, viewModel) {
    $(function() {
        d3.json("data.json", function(error, data) {
            
            var view = new viewModel(data);
            view.initialize();

            ko.applyBindings(view);
        });
    });
});