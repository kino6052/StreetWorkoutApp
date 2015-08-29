(function() {
        'use strict';

        angular
            .module('app')
            .config(config);

        config.$inject = ['$routeProvider'];

        function config($routeProvider) {
            $routeProvider
                .when('/stats', {
                    templateUrl: '/js/app/stats/stats.html',
                    controller: 'StatsController',
                    controllerAs: 'vm'
                });
        }
}());
        