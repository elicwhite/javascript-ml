// A simple Q Learning model

function Model() {
    "use strict";

    this.qValues = {};

    // Start state is an empty board
    this.getStartState = function() {
        return new State([0, 0, 0, 0, 0, 0, 0, 0, 0]);
    };

    this.getRandAction = function(state) {
        var options = state.getActions(2);
        var option = options[rand(0, options.length)];
        return new State(option);
    };

    this.getEdge = function(from, to) {
        // We don't care about the state we came from in tictactoe.
        return to;
    };

    this.isGoal = function(state) {
        return !!state.isTerminal();
    };

    this.getReward = function(edge) {
        var result = edge.isTerminal();

        if (result == "1 wins") {
            //console.log(result);
            return -200; // lose
        } else if (result == "2 wins") {
            //console.log(result);
            return 100; // win
        } else if (result == "tie") {
            return 10;
        } else {
            return 0;
        }
    };

    this.maxQForState = function(state) {
        // In this case, the max q for a terminal state is whatever it's own reward is
        var reward = this.getReward(state);
        if (reward) {
            return {
                action: state,
                value: reward
            };
        }

        var options = state.getActions(2);


        var bestOption = options[0];

        for (var i = 1; i < options.length; i++) {
            if (this.getQ(bestOption) < this.getQ(options[i])) {
                bestOption = options[i];
            }
        }

        var sObj = new State(bestOption);
        var result = {
            action: sObj,
            value: this.getQ(sObj)
        };

        return result;
    };

    this.setQ = function(edge, q) {
        this.qValues[edge.toString()] = q;
    };

    this.getQ = function(edge) {
        if (edge.toString() in this.qValues) {
            return this.qValues[edge.toString()];
        }

        return 0;
    };

    function rand(min, max) {
        return Math.round(Math.random() * (max - 1 - min) + min);
    }
}