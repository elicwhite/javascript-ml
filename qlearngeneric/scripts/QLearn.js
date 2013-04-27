function QLearn(gamma, model) {
    "use strict";

    this.learn = function(episodes) {
        var state;

        // learn by running randomly episodes number of times
        for (var episode = 0; episode < episodes; episode++) {
            state = model.getRandomState();

            while (!model.isGoal(state)) {
                // Action is the state to go to
                var action = model.getRandAction(state);

                var maxQ = model.maxQForState(action).value;

                var edge = model.getEdge(state, action);
                edge.q = edge.reward + gamma * maxQ;
                state = action;
            }
        }
    };

    this.display = function() {
        var ul = document.getElementById("paths");
        var state;

        var states = model.getStates();

        // Print the shortest paths
        for (var start = 0; start < states.length; start++) {

            state = start;
            var path = "Shortest path from " + state + ": ";
            do {
                path += state + " ";
                if (model.isGoal(state)) {
                    break;
                }
                state = model.maxQForState(state).action;
            }
            while (true);

            var li = document.createElement("li");
            li.innerText = path;
            ul.appendChild(li);
        }
    };
}