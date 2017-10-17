(function () {
    "use strict";

    define([
        'dojo/_base/array',
        'helpers/symbolhelper',
        'esri/map',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/layers/FeatureLayer',    
        'helpers/loadData',
        'dojo/dom'
    ], function (array, sym, Query, QueryTask, FeatureLayer) {

        function SelectOneController($scope, $log) {
            $scope.LoadSelectOne = function () {

                var selected = document.getElementById("select-1").value;

                if (selected == 'state') {
                    //alert('State');

                    var selectTwo = document.getElementById('select-2');
                    selectTwo.setAttribute("disabled", "true")
                    clearSelect(selectTwo);

                    var myExtent = new esri.geometry.Extent(
                                    { "xmin": -9386662, "ymin": 4007552, "xmax": -8400130, "ymax": 4381853, "spatialReference": { "wkid": 102100 } });
                    $scope.map.setExtent(myExtent);
                    $scope.$apply();

                } else if (selected == 'county') {

                    var selectTwo = document.getElementById('select-2');
                    selectTwo.removeAttribute("disabled");

                    clearSelect(selectTwo);
                    loadCounties(selectTwo);

                } else {

                    var selectTwo = document.getElementById('select-2');
                    //selectTwo.setAttribute("disabled", "false")
                    selectTwo.removeAttribute("disabled");
                    clearSelect(selectTwo);

                    //initialize query task
                    var queryTask = new esri.tasks.QueryTask("http://152.14.29.115/arcgis/rest/services/GSHP_Reference_Layers/MapServer/2");

                    var query = new esri.tasks.Query();
                    query.returnGeometry = false;
                    query.outFields = ["MB_NAME"];
                    query.where = "ObjectID >= 0 ORDER BY MB_NAME";
                    queryTask.execute(query, loadCities, onError);
                    

                }


                //loadData(selected);
                $scope.$apply();
            };

        }

        function onError() {

            //alert('Error');
        }

        function loadCities(featureSet) {

            var selectTwo = document.getElementById('select-2');

            var select = document.createElement("option");
            select.text = "Select";
            selectTwo.add(select);

            //Loop through each feature returned
            for (var i = 0; i < featureSet.features.length; i++) {
                //Get the current feature from the featureSet.
                //Feature is a graphic
                
                var graphic = featureSet.features[i];
                var county = graphic.attributes['MB_NAME']

                //var optStr = 'option' + str(i);
                var option = document.createElement("option");
                option.text = county;
                selectTwo.add(option);

            }
        }

        function init(App) {
            App.controller('SelectOneCtrl', ['$scope', '$log', SelectOneController]);
            return SelectOneController;
        }

        return { start: init };

    });

}).call(this);