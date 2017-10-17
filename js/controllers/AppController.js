

(function () {
    "use strict";

    define([
        'angular',
        'esri/map',
        'esri/geometry/Extent',
        'esri/layers/ArcGISDynamicMapServiceLayer'
    ], function (angular, Map, Extent, ArcGISDynamicMapServiceLayer) {

        var myExtent = new esri.geometry.Extent(
                                { "xmin": -9386662, "ymin": 4007552, "xmax": -8400130, "ymax": 4381853, "spatialReference": { "wkid": 102100 } });
        function mapConfigs() {
            return {
                extent: myExtent,
                zoom: 8,
                logo: false
            };
        }

        function mapGen(elem) {
            return new Map(elem, mapConfigs());
        }

        function AppController($scope) {
            $.ajax({
                type: "GET",
                url: "config/config.json",
                dataType: "json",
                success: function (resp) {
                    $scope.AppConfig = resp;
                    $scope.map = mapGen('map');
                    $scope.itemInfo = {};
                    $scope.isFirst = true;
                    $scope.buttonImageURL = "images/world_imagery.png";
                    $scope.MapType = "World Imagery";
                    map = $scope.map;

                    if (mobe) {
                        hideZoomSlider();
                    }
                    else {
                        showZoomSlider();
                    }

                    onMapLoaded();

                },
                error: function (resp) {
                    console.log(resp);
                }
            });
            


        }

        function init(App) {
            App.controller('AppCtrl', ['$scope', AppController]);
            return AppController;
        }


        return { start: init };

    });

}).call(this);