(function () {
    "use strict";

    define([
        'dojo/_base/array',
        'helpers/symbolhelper',
        'esri/map',
        'esri/layers/ArcGISTiledMapServiceLayer',
        'dojo/domReady!'
    ], function (array, sym) {

        function InsertLayerController($scope, $log) {
            $scope.InsertLayer = function () {

                $scope.map.removeAllLayers();
               
                if ($scope.isFirst == true) {
                    $scope.buttonImageURL = "images/topo.png";
                    $scope.MapType = "Topography";
                    var myServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer";
                    $scope.isFirst = false;
                }
                else
                {
                    $scope.buttonImageURL = "images/world_imagery.png";
                    $scope.MapType = "World Imagery";
                    var myServiceURL = "http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer";
                    $scope.isFirst = true;
                }
                var myLayer = new esri.layers.ArcGISTiledMapServiceLayer(myServiceURL);
                myLayer.visible = true;
                $scope.map.addLayer(myLayer);
                $scope.$apply();
            };

        }

        function init(App) {
            App.controller('InsertLayerCtrl', ['$scope', '$log', InsertLayerController]);
            return InsertLayerController;
        }

        return { start: init };

    });

}).call(this);