
(function() {
    'use strict';

    var pathRX = new RegExp(/\/[^\/]+$/), locationPath = '';

    define('angular', function() {
        if (angular) { return angular; }
        return {};
    });

    require({
        async: true,
        aliases: [['text', 'dojo/text']],
        packages: [{
            name: 'controllers',
            location: locationPath + '/js/controllers'
        }, {
            name: 'helpers',
            location: locationPath + '/js/helpers'
        }, {
            name: 'widgets',
            location: locationPath + '/js/widgets'
        }, {
            name: 'js',
            location: locationPath + '/js'
        }
        ]
    });

    require([
        'dojo/ready',
        'js/bootstrap'
    ], function(ready, bootstrap) {
        ready(function () {
            console.info('start the bootstrapper');
            bootstrap.start();
        });
    });

}).call(this);