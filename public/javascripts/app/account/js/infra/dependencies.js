require.config({
    baseUrl: '/javascripts/',
    paths: {
        'domReady': 'libs/domReady',
        'angular': 'bower_components/angular/angular',
        'ui-router': 'bower_components/angular-ui-router/release/angular-ui-router.min',
        'ngUpload':'bower_components/ng-file-upload/ng-file-upload.min',
		'ngUploadShim':'bower_components/ng-file-upload/ng-file-upload-shim.min',
        'ng-resource':'bower_components/angular-resource/angular-resource.min',
        'ng-animate':'bower_components/angular-animate/angular-animate',
    },
    shim: {

        'angular': {
            exports: 'angular'
        },
        'ui-router': {
            deps: ['angular'],
            exports: 'ui-router'
        },
        'ng-resource':{
		    deps:['angular'],
			exports:'ng-resource'	
		},
		'ngUpload':{
		    deps:['angular'],
			exports:'ng-resource'
		},
		
		'ngUploadShim':{
			deps:['angular,ngUpload'],
			exports:'ngUploadShim'
		},
		
		'ng-animate':{
			deps:['angular'],
			exports:'ng-animate'
		},
    },
    deps: ['app/account/js/infra/bootstrap']
})

