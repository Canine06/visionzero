
(function () {
    "use strict";

    define([
        'dojo/_base/array'

    ], function (array) {

        function SelectOneDirective() {
            return {
                restrict: 'E',
                template: "<select name='select-1' id='select-1'><option value='state' selected>State</option><option value='county'>County</option><option value='city'>City</option>",
                controller: 'SelectOneCtrl',
                link: function (scope, element) {
                    element.bind('change', function () {
                        
                        scope.LoadSelectOne();
                    });



                }
            };
        }

        function init(App) {
            App.directive('selectOne', [SelectOneDirective]);
            return SelectOneDirective;
        }

        return { start: init };

    });

}).call(this)