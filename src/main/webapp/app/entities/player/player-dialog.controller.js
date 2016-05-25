(function() {
    'use strict';

    angular
        .module('basketballApp')
        .controller('PlayerDialogController', PlayerDialogController);

    PlayerDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Player'];

    function PlayerDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Player) {
        var vm = this;
        vm.player = entity;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        var onSaveSuccess = function (result) {
            $scope.$emit('basketballApp:playerUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        };

        var onSaveError = function () {
            vm.isSaving = false;
        };

        vm.save = function () {
            vm.isSaving = true;
            if (vm.player.id !== null) {
                Player.update(vm.player, onSaveSuccess, onSaveError);
            } else {
                Player.save(vm.player, onSaveSuccess, onSaveError);
            }
        };

        vm.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };

        vm.datePickerOpenStatus = {};
        vm.datePickerOpenStatus.birthday = false;

        vm.openCalendar = function(date) {
            vm.datePickerOpenStatus[date] = true;
        };
    }
})();
