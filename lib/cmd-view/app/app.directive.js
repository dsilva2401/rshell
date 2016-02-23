(function (ang) {
	
	var app = ang.module('app');

	app.directive('appContainer', function () {
		return {
			restrict: 'EA',
			templateUrl: '/cmd-view/app/app.html',
			controller: 'appController'
		}
	});

})(angular)