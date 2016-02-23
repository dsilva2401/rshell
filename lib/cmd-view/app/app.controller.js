(function (ang) {
	
	var app = ang.module('app');

	app.controller('appController', function ($scope, $http, $window) {
		$scope.methods = $scope.methods || {};
		$scope.models = $scope.models || {};

		// Methods
			$scope.methods.getUrlParams = function () {
				var p = {};
				var params = $window.location.search;
				params = params.substring( 1, params.length - (params[params.length-1]=='/') );
				params.split('&').forEach(function (_p) {
					p[ _p.split('=')[0] ] = _p.split('=')[1];
				});
				return p;
			}
			$scope.methods.submit = function () {
				var clientId = $scope.methods.getUrlParams().clientId || $scope.methods.getUrlParams().cId;
				$http.post('/client/'+clientId+'/command', { command: $scope.models.cmd })
				// Success
				.then(function (resp) {
					console.log(resp.data);
					$scope.models.response = resp.data.out;
					$scope.models.code = resp.data.code;
					$scope.models.error = resp.data.error;
					$scope.models.cmd = '';
				})
				// Error
				.catch(function (resp) {
					console.warn('Error', resp);
				})
			}
			
		
		// Init

	});

})(angular)