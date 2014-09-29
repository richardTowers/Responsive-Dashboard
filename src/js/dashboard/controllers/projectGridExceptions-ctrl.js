angular.module('dash').controller('projectGridExceptions', ['$scope', function ($scope) {
    var closedAlerts = [];

    $scope.closeAlert = function (index) {
        closedAlerts.push(index);
    };
    $scope.shouldShowAlert = function (index) {
        return closedAlerts.indexOf(index) < 0;
    };
}]);