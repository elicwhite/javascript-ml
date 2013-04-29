window.onload = function(gamma) {
    "use strict";

    var model = new Model();
    var learner = new QLearn(0.8, model);

    //100,000 => 5991, 2863
    // 10,000 => 4903, 1937
    //  1,000 => 1775, 523
    //    100 => 289, 60
    learner.learn(100000);
    console.log(Object.keys(model.qValues).length);
};