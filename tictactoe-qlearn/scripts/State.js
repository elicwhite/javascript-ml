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
        var i, j;

        var spotLeft = false;

        // check the rows
        for (i = 0; i < 9; i += 3) {
            for (j = i; j < i + 3; j++) {
                if (arr[i + j] != 2) {
                    break;
                }

                if (j == 2) {
                    return "gameover";
                }
            }
        }

        // check the cols
        for (i = 0; i < 3; i++) {
            for (j = i; j < 9; j += 3) {
                if (arr[i + j] != 2) {
                    break;
                }

                if (j == 2) {
                    return "gameover";
                }
            }
        }

        // check the diag one
        for (i = 0; i < 3; i++) {
            if (arr[i + (3 * i)] != 2) {
                break;
            }

            if (i == 2) {
                return "gameover";
            }
        }

        // check other diag
        for (i = 0; i < 3; i++) {
            if (arr[6 - (2 * i)] != 2) {
                break;
            }

            if (i == 2) {
                return "gameover";
            }
        }

        // Is the board full?
        for (i = 0; i < 9; i++) {
            if (arr[i] === 0) {
                return false;
            }
        }

        // It's all taken!
        return "tie";
    };
}