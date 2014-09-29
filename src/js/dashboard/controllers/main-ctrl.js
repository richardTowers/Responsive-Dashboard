angular.module('dash').controller('main', ['$scope', function ($scope) {
    $scope.sidebarActive = true;
    $scope.toggleSidebar = function () {
        $scope.sidebarActive = !$scope.sidebarActive;
    };
}]);