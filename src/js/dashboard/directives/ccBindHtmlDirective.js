angular.module('dash').directive('ccBindHtml', ['$compile', function ($compile) {
	return {
		restrict: 'A',
		scope: { html: '=ccBindHtml' },
		link: function (scope, element, attrs) {
			scope.$watch('html', function () {
				element.html(scope.html);
				$compile(element.contents())(scope.$parent);
			});
		}
	};
}]);