// A simple Q Learning model
function Model() {
    var edges = {
        0: [{
            state: 4,
            reward: 0,
            q: 0
        }],
        1: [{
            state: 3,
            reward: 0,
            q: 0
        }, {
            state: 5,
            reward: 100,
            q: 0
        }],
        2: [{
            state: 3,
            reward: 0,
            q: 0
        }],
        3: [{
            state: 1,
            reward: 0,
            q: 0
        }, {
            state: 4,
            reward: 0,
            q: 0
        }],
        4: [{
            state: 0,
            reward: 0,
            q: 0
        }, {
            state: 3,
            reward: 0,
            q: 0
        }, {
            state: 5,
            reward: 100,
            q: 0
        }],
        5: [{
            state: 1,
            reward: 0,
            q: 0
        }, {
            state: 4,
            reward: 0,
            q: 0
        }, {
            state: 5,
            reward: 100,
            q: 0
        }]
    };

    var states = Object.keys(edges);


    this.isGoal = function(state) {
        return state == 5;
    };

    this.getRandomState = function() {
        return states[rand(0, states.length)];
    };

    // Given a state, get a random edge out
    this.getRandAction = function(state) {
        var options = [];

        for (var edge in edges[state]) {
            options.push(edges[state][edge].state);
        }

        return options[rand(0, options.length)];
    };

    // Try to get the edge object that goes from state 'from' to state 'to'
    this.getEdge = function(from, to) {
        for (var edge in edges[from]) {
            if (edges[from][edge].state == to) {
                return edges[from][edge];
            }
        }

        console.error("Edge not found from: " + from + " to: " + to);
    };

    this.maxQForState = function(state) {
        var result = {
            value: edges[state][0].q,
            action: edges[state][0].state
        };

        for (var i = 1; i < edges[state].length; i++) {
            if (result.value < edges[state][i].q) {
                result.value = edges[state][i].q;
                result.action = edges[state][i].state;
            }
        }

        return result;
    };

    this.getStates = function() {
        return states;
    };

    // Returns a random number between min inclusive and max exclusive.
    function rand(min, max) {
        return Math.round(Math.random() * (max - 1 - min) + min);
    }
}