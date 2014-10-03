angular.module('dash').controller('projectGridForm', ['$scope', '$modal', '$http', function ($scope, $modal, $http) {

    var modalInstance;

    $scope.closeModal = function () {
        modalInstance && modalInstance.close();
    };

    $scope.checkParameters = function (buttonName, buttonValue, parametersUrl) {

        $scope.modalContents = '<i class="fa fa-spinner fa-spin fa-2x"></i>';
        $scope.modalHeader = 'Checking for parameters...';

        modalInstance = $modal.open({
            scope: $scope,
            template: '<div class="modal-header">' +
                '<h3 class="modal-title">{{modalHeader}}</h3>' +
                '</div><div class="modal-body" cc-bind-html="modalContents"></div>'
        });

        $http.get(parametersUrl).then(function (response) {
            if (response.data == 'NONE') {
                $scope.closeModal();
                $scope.ccSubmit({name: buttonName, value: buttonValue});
            }
            $scope.modalHeader = 'Parameters';
            $scope.modalContents = response.data;
        });
    };
}]);