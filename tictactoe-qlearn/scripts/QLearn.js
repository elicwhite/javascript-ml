function QLearn(gamma, model) {
    "use strict";

    this.learn = function(episodes) {
        var state;

        // 1 means random player, 2 means q-learner
        var whoseTurn = 1;


        // learn by running randomly episodes number of times
        for (var episode = 0; episode < episodes; episode++) {
            state = model.getStartState();

            while (!model.isGoal(state)) {
                if (whoseTurn == 1) {
                    var options = state.getActions(1);
                    state = new State(options[rand(0, options.length)]);

                    whoseTurn = 2;
                } else {
                    // Action is the state to go to
                    var action = model.getRandAction(state);

                    var maxQ = model.maxQForState(action).value;

                    var edge = model.getEdge(state, action);

                    var q = model.getReward(edge) + gamma * maxQ;
                    if (q > 0) {
                        model.setQ(edge, q);
                    }

                    state = action;

                    whoseTurn = 1;
                }
            }
        }
    };

    function rand(min, max) {
        return Math.round(Math.random() * (max - 1 - min) + min);
    }
}