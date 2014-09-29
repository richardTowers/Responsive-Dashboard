angular.module('dash').controller('projectGrid', ['$scope', function ($scope) {
    $scope.shouldShowRow = function (data) {
        return !$scope.projectGridSearch || data.toLowerCase().indexOf($scope.projectGridSearch.toLowerCase()) >= 0;
    };
}]);