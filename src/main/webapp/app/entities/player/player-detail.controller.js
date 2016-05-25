(function() {
    'use strict';

    angular
        .module('basketballApp')
        .controller('PlayerDetailController', PlayerDetailController);

    PlayerDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'entity', 'Player'];

    function PlayerDetailController($scope, $rootScope, $stateParams, entity, Player) {
        var vm = this;
        vm.player = entity;
        
        var unsubscribe = $rootScope.$on('basketballApp:playerUpdate', function(event, result) {
            vm.player = result;
        });
        $scope.$on('$destroy', unsubscribe);

    }
})();
