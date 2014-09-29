angular.module('dash').controller('projectGrid', ['$scope', '$modal', function ($scope, $modal) {
    $scope.shouldShowRow = function (data) {
        return !$scope.projectGridSearch || data.toLowerCase().indexOf($scope.projectGridSearch.toLowerCase()) >= 0;
    };
    $scope.forceBuild = function () {
        var modalInstance = $modal.open({
            template: '<div>HELLOOO!!</div>'
        });
    };
}]);