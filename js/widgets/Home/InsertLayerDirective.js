
(function () {
    "use strict";

    define([
        'dojo/_base/array'

    ], function (array) {

        function InsertLayerDirective() {
            return {
                restrict: 'E',
                template: "<button class='btn btn-primary' id='testid'><img ng-src='{{buttonImageURL}}' style='width:100px; height:50px;'/><br />{{MapType}}</button>",
                controller: 'InsertLayerCtrl',
                link: function (scope, element) {
                    //<i class='fa fa-home'></i>
                    element.bind('click', function () {
                        //alert("here");
                        scope.InsertLayer();
                    });



                }
            };
        }

        function init(App) {
            App.directive('insertlayerButton', [InsertLayerDirective]);
            return InsertLayerDirective;
        }

        return { start: init };

    });

}).call(this);