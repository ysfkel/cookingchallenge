
define([
	'app/modules/app'
], function(app) {
	'use strict';
	var resource=app.factory('profileRepository',['$resource',function($resource){
		
		return $resource('/api/v1/profile/:id',{id:'@id'},{update:{method:'PUT'}} );
	}]);
	
	
	
	return resource;
});





