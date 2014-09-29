angular.module('dash').controller('projectGridForm', ['$scope', '$modal', '$sce', '$http', function ($scope, $modal, $sce, $http) {
    $scope.checkParameters = function (buttonName, buttonValue, parametersUrl) {

        $scope.modalContents = $sce.trustAsHtml('<i class="fa fa-spinner fa-spin fa-2x"></i>');
        $scope.modalHeader = 'Checking for parameters...';

        var modalInstance = $modal.open({
            scope: $scope,
            template: '<div class="modal-header">' +
                '<h3 class="modal-title">{{modalHeader}}</h3>' +
                '</div><div class="modal-body" ng-bind-html="modalContents"></div>'
        });

        $http.get(parametersUrl).then(function (response) {
            if (response.data == 'NONE') {
                modalInstance.close();
                $scope.ccSubmit({name: buttonName, value: buttonValue});
            }
            $scope.modalHeader = 'Parameters';
            $scope.modalContents = $sce.trustAsHtml(response.data);
        });
    };
}]);