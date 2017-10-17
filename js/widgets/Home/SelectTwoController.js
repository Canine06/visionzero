(function () {
    "use strict";

    define([
        'dojo/_base/array',
        'helpers/symbolhelper',
        'esri/map',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/layers/FeatureLayer',
        'esri/geometry/Extent',
        'esri/layers/ArcGISTiledMapServiceLayer',
        'dojo/domReady!'
    ], function (array, sym, Query, QueryTask, FeatureLayer) {

        var Map;

        function SelectTwoController($scope, $log) {
            $scope.LoadSelectTwo = function () {

                var selected = document.getElementById("select-1").value;
                var cityCounty = document.getElementById("select-2").value;
                Map = $scope.map;


                if (selected == 'county') {
                    //alert('State');

                    //var selectTwo = document.getElementById('select-2');
                    //initialize query task
                    var queryTask = new esri.tasks.QueryTask("http://152.14.29.115/arcgis/rest/services/GSHP_Reference_Layers/MapServer/3");

                    var query = new esri.tasks.Query();
                    query.returnGeometry = true;
                    query.outFields = ["County"];
                    query.where = "County = '" + cityCounty + "'";
                    queryTask.execute(query, zoomCounty);


                } else if (selected == 'city') {

                    //var selectTwo = document.getElementById('select-2');
                    //initialize query task
                    var queryTask = new esri.tasks.QueryTask("http://152.14.29.115/arcgis/rest/services/GSHP_Reference_Layers/MapServer/2");

                    var query = new esri.tasks.Query();
                    query.returnGeometry = true;
                    query.outFields = ["MB_NAME"];
                    query.where = "MB_NAME = '" + cityCounty + "'" ;
                    queryTask.execute(query, zoomCity);


                }

                $scope.$apply();
            };

        }

        function zoomCounty(featureSet) {

            //Loop through each feature returned
            for (var i = 0; i < featureSet.features.length; i++) {
                //Get the current feature from the featureSet.
                //Feature is a graphic

                var graphic = featureSet.features[i];
                var geometry = graphic.geometry;
                var myExtent = geometry.getExtent();
 
                Map.setExtent(myExtent);

            }
        }

        function zoomCity(featureSet) {

            //Loop through each feature returned
            for (var i = 0; i < featureSet.features.length; i++) {
                //Get the current feature from the featureSet.
                //Feature is a graphic

                var graphic = featureSet.features[i];
                var geometry = graphic.geometry;
                var myExtent = geometry.getExtent();

                Map.setExtent(myExtent);
            }
        }

        function OnError() {


            alert('Error');
        }

        function init(App) {
            App.controller('SelectTwoCtrl', ['$scope', '$log', SelectTwoController]);
            return SelectTwoController;
        }

        return { start: init };

    });

}).call(this);