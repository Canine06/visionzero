
(function () {
    "use strict";

    define([
        'dojo/_base/array'

    ], function (array) {

        function HomeDirective() {
            return {
                restrict: 'E',
                template: "<button class='btn btn-primary' id='testid'><img ng-src='images/home.png' style='width:50px; height:50px;'/><br />Home</button>",
                controller: 'HomeCtrl',
                link: function (scope, element) {
                    //<i class='fa fa-home'></i>
                    element.bind('click', function () {
                        //alert("here");
                        scope.homeExtent();                    
                    });
                    


                }
            };
        }

        function init(App) {
            App.directive('homeButton', [HomeDirective]);
            return HomeDirective;
        }

        return { start: init };

    });

}).call(this);