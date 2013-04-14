window.onload = function() {
    "use strict";

    // states are rows, actions are columns
    var reward = [
        [-1, -1, -1, -1, 0, -1],
        [-1, -1, -1, 0, -1, 100],
        [-1, -1, -1, 0, -1, -1],
        [-1, 0, 0, -1, 0, -1],
        [0, -1, -1, 0, -1, 100],
        [-1, 0, -1, -1, 0, 100]
    ];

    var toColor = d3.scale.linear().domain([0, 100]).range(["red", "green"]);

    var container = document.getElementById("box");

    var q = [];
    for (var i = 0; i < reward.length; i++) {
        q[i] = [];
        for (var j = 0; j < reward[0].length; j++) {
            q[i][j] = 0;
        }
    }

    var gamma = 0.8;

    var episodes = 100;

    var goal = 5;

    for (var episode = 0; episode < episodes; episode++) {
        var state = rand(0, reward.length);

        while (state != goal) {
            // Action is the number of the state to go to
            var action = getRandAction(state);

            var maxQ = maxQForState(action).value;
            console.log(maxQ);
            q[state][action] = reward[state][action] + gamma * maxQ;
            state = action;
        }
    }

    for (i = 0; i < reward.length; i++) {
        var row = document.createElement("div");

        for (var j = 0; j < reward[0].length; j++) {
            var qValue = q[i][j];

            var cell = document.createElement("div");
            cell.className = "cell";
            cell.style.backgroundColor = toColor(qValue);

            if (qValue !== 0) {
                cell.innerText = qValue;
            }
            row.appendChild(cell);
        }

        container.appendChild(row);
    }

    var ul = document.getElementById("paths");


    // Print the shortest paths
    for (i = 0; i < reward.length; i++) {
        var state = i;

        var path = "";
        do {
            path += state + " ";
            if (state == goal) {
                break;
            }
            state = maxQForState(state).action;
        }
        while (true);

        var li = document.createElement("li");
        li.innerText = path;
        ul.appendChild(li);
    }


    // Returns a random number between min inclusive and max exclusive.

    function rand(min, max) {
        return Math.round(Math.random() * (max - 1 - min) + min);
    }

    function getRandAction(state) {
        var actions = [];
        for (var i = 0; i < reward[state].length; i++) {
            if (reward[state][i] != -1) {
                actions.push(i);
            }
        }

        return actions[rand(0, actions.length)];
    }

    function maxQForState(state) {
        var result = {
            value: q[state][0],
            action: 0
        };

        for (var i = 1; i < q[state].length; i++) {
            if (result.value < q[state][i]) {
                result.value = q[state][i];
                result.action = i;
            }
        }

        return result;
    }

    console.log("loaded");
};