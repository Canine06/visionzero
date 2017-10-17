

(function () {
    "use strict";

    define([
        'dojo/_base/array',
        'helpers/symbolhelper'

    ], function (array, sym) {

        function HomeController($scope, $log, $http) {
            $scope.homeExtent = function () {

                var extent = new esri.geometry.Extent(
                    {
                        "xmin": -14456618, "ymin": 2755951, "xmax": -6823325, "ymax": 6548744, "spatialReference": { "wkid": 102100 }
                    });
                $scope.map.setExtent(extent);
                //$http.get('http://localhost/AstadiaMap/json/maps.json').success(function (data, status, headers, config) {
                //    $scope.maps = data;
                //    alert('On demand map data loaded');
                //}).error(function (data, status, headers, config) {
                //    alert('Could not load json data dfsa');
                //})

            };

        }

        function init(App) {
            App.controller('HomeCtrl', ['$scope', '$log', '$http', HomeController]);
            return HomeController;
        }

        return { start: init };

    });

}).call(this);