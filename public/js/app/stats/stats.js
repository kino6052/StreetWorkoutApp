(function() {
    'use strict';
    
    angular
        .module('app')
        .controller('StatsController', StatsController);
    
    StatsController.$inject = ['$http'];

    function StatsController($http) {
        var vm = this;
        $http.get('/stats')
            .then(function(response) {
                console.log(response.data[0]["app-info"]["timeline"]);
                vm.stats = response.data[0]["app-info"]["timeline"]["today"];
            },
            function(reason){
                console.log(reason);
            })
            .catch(function(err){
                console.log(err);
            });
    }
}());

