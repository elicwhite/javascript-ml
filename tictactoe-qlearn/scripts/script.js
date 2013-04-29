window.onload = function(gamma) {
    "use strict";

    var state;
    var whoseTurn;

    var model = new Model();
    var learner = new QLearn(0.8, model);

    //300,000 =>       2909
    //200,000 =>       2904, 425
    //100,000 => 5991, 2863, 425
    // 70,000 =>            425
    // 30,000 =>            424
    // 10,000 => 4903, 1937, 406
    //  1,000 => 1775, 523, 315
    //    100 => 289, 60, 40
    learner.learn(10000);
    console.log(Object.keys(model.qValues).length+" states with non-zero q-values");

    $(".cell").click(function() {
        if (this.id.indexOf("q") == -1) {
            clickPiece(this);
        }
    });

    function newGame() {
        whoseTurn = 1;
        state = [0, 0, 0, 0, 0, 0, 0, 0, 0];

        var turnEle = $("#whoseTurn")[0];
    }

    // called when a piece is clicked on

    function clickPiece(ele) {
        var index = ele.id;

        // If that spot hasn't been claimed
        if (state[index] === 0 && whoseTurn == 1) {
            set(index, 1);
        }
    }

    function set(index, playerNum) {
        state[index] = playerNum;
        var ele = document.getElementById(index);
        if (playerNum == 1) {
            $(ele).addClass("X");
        } else {
            $(ele).addClass("O");
        }

        if (whoseTurn == 1) {
            whoseTurn = 2;
            compMove();
        } else {
            whoseTurn = 1;
        }
    }

    function compMove() {
        var s = new State(state);
        var newState = model.maxQForState(s).action.toString();

        for (var i = 0; i < 9; i++) {
            if (newState[i] == 2 && state[i] != 2) {
                // compouter chose position i
                set(i, 2);
            }
        }
    }

    newGame();
};