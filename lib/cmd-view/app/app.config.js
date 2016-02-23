(function (ang) {
	
	var app = ang.module('app');

	app.config(function ($resourcesProvider, $stateProvider, $urlRouterProvider) {

		// Router
			// $urlRouterProvider.otherwise("/");
			$stateProvider
				.state('stateX', {
					url: '/state-x',
					template: 'State X',
				})


	});


})(angular)