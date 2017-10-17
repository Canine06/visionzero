

(function () {
    "use strict";

    define([
       
        'widgets/Home/HomeController',
        'widgets/Home/HomeDirective'
    ], function (HomeController, HomeDirective) {

        function init(App) {
            
            HomeController.start(App);
            HomeDirective.start(App);
        }

        return { start: init };

    });

}).call(this);