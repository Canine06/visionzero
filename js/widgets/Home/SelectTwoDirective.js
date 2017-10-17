
(function () {
    "use strict";

    define([
        'dojo/_base/array'

    ], function (array) {

        function SelectTwoDirective() {
            return {
                restrict: 'E',
                template: "<select name='select-2' id='select-2' disabled ='true'>",
                controller: 'SelectTwoCtrl',
                link: function (scope, element) {
                    //<i class='fa fa-home'></i>
                    element.bind('change', function () {
                        //alert("here");
                        scope.LoadSelectTwo();
                    });



                }
            };
        }

        function init(App) {
            App.directive('selectTwo', [SelectTwoDirective]);
            return SelectTwoDirective;
        }

        return { start: init };

    });

}).call(this)