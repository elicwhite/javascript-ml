window.onload = function(gamma) {
    "use strict";

    var model = new Model();
    var learner = new QLearn(0.8, model);

    learner.learn(100);
    learner.display();
};