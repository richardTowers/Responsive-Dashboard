angular.module('dash').directive('ccSubmit', function () {
	return function (scope, element) {
		scope.ccSubmit = function (extraInput) {
			if (extraInput) {
				element.append('<input type="hidden" name="' + extraInput.name + '" value="' + extraInput.value + '">');
			}
			element[0].submit();
		};
	};
});