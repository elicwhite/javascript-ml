// A simple Q Learning model

function Model() {
    // Start state is an empty board
    this.getStartState = function() {
        return [0, 0, 0, 0, 0, 0, 0, 0, 0];
    };

    this.getRandAction = function(state) {
        var options = state.getActions();
        return options[rand(0, options.length)];
    };

    this.getEdge = function(from, to) {
        // We don't care about the state we came from in tictactoe.
        return to;
    };

    this.isGoal = function(state) {
        return !!state.isTerminal();
    };

    this.getReward = function(edge) {
        var result = state.isTerminal();
        if (result == "gameover") {
            return 10;
        } else if (result == "tie") {
            return 1;
        } else {
            return 0;
        }
    };

    this.maxQForState = function(state) {
        var options = state.getActions();


        var result = options[0];

        for (var i = 1; i < options.length; i++) {
            if (result.q < options[i].q) {
                result = options[i];
            }
        }

        return result;
    };

    this.setQ = function(edge, q) {
        edge.q = q;
    };

    this.getQ = function(edge) {
        return edge.q;
    };


    // Returns a random number between min inclusive and max exclusive.

    function rand(min, max) {
        return Math.round(Math.random() * (max - 1 - min) + min);
    }
}