function State(arr) {
    "use strict";
    /*
    arr should be an array with 9 items to represent a 3x3 grid
    The indexes of the array make the grid look like:
    0 1 2
    3 4 5
    6 7 8

    each element can be a 0, 1, or 2. 0 means no player has taken that spot
    1 means it is an X, 2 means it is an O
    */

    // The computer is ALWAYS 2.

    this.toString = function() {
        return arr;
    };

    this.getActions = function(player) {
        var options = [];

        for (var i = 0; i < 9; i++) {
            // If spot i isn't taken, it's a possible move
            if (arr[i] === 0) {
                var clone = arr.slice(0);
                clone[i] = player;
                options.push(clone);
            }

        }

        return options;
    };

    this.isTerminal = function() {
        var winner = 0;

        // check rows
        if (arr[0] && arr[0] == arr[1] && arr[0] == arr[1]) {
            winner = arr[0];
        } else if (arr[3] && arr[3] == arr[4] && arr[3] == arr[5]) {
            winner = arr[3];
        } else if (arr[6] && arr[6] == arr[7] && arr[6] == arr[8]) {
            winner = arr[6];
        }
        // Check columns
        else if (arr[0] && arr[0] == arr[3] && arr[0] == arr[6]) {
            winner = arr[0];
        } else if (arr[1] && arr[1] == arr[4] && arr[1] == arr[7]) {
            winner = arr[1];
        } else if (arr[2] && arr[2] == arr[5] && arr[2] == arr[8]) {
            winner = arr[2];
        }
        // check diags
        else if (arr[0] && arr[0] == arr[4] && arr[0] == arr[8]) {
            winner = arr[0];
        } else if (arr[6] && arr[6] == arr[4] && arr[6] == arr[2]) {
            winner = arr[6];
        }

        if (winner) return winner + " wins";

        // we don't have a winner, is every spot taken?
        var spotLeft = false;
        for (var i = 0; i < 9; i++) {
            if (arr[i] === 0) {
                spotLeft = true;
                break;
            }
        }

        if (spotLeft) return false;

        return "tie";
    };
}