
(function () {
    "use strict";

    define([
        'angular',
        'controllers/AppController',
        'widgets/Home/HomeBootstrap'
    ], function (angular, AppController, HomeBootstrap) {

        function init() {
            var App = angular.module('app', ['ui.bootstrap']);
            AppController.start(App);
            HomeBootstrap.start(App);
            // need to bootstrap angular since we wait for dojo/DOM to load
            angular.bootstrap(document.body, ['app']);
            return App;
        }

        return { start: init };

    });

}).call(this);