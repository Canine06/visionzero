

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
<<<<<<< HEAD
                    AppConfig = resp;
                    boundariesURL = AppConfig.MapLayers[0].url;
                    crashURL = AppConfig.MapLayers[1].url;
                    crashURLNotLocated = AppConfig.MapLayers[2].url;
                    basemaps = AppConfig.BaseMaps;
                    crashFactors = AppConfig.CrashFactors;
=======
                    $scope.AppConfig = resp;
>>>>>>> 832d8bd3ae9b8f6c3cc8a5ad57525196d13140c3
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