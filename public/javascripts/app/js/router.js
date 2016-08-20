define(['app/modules/app', 'ui-router',
  'app/account/js/resources/view'
], function (app, uiRouter, view) {


    app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

        $stateProvider
        .state('base', {
            abstract: true,
            templateUrl: '/javascripts/app/account/templates/layout.html'
        })
        .state('base.profile', view.profile)
        .state('base.images',view.images)

        $urlRouterProvider.otherwise('/index');

        //CORS SETTINGS
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $httpProvider.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
        $httpProvider.defaults.headers.common["Accept"] = "application/json";
        $httpProvider.defaults.headers.common["content-type"] = "application/json";
        $httpProvider.defaults.headers.common['Authorization'] = 'Basic WW91ckFwcElkOllvdXJBcHBTZWNyZXQ=';

    })

})
