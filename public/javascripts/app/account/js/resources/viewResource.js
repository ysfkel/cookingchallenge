define([
   'app/account/js/resources/dataResource',
    'app/account/js/controllers/details',
     'app/account/js/controllers/images-controller'
], function (dataResource,detailsController,imagesController) {
    var views = {
        profile: {
            templateUrl: '/javascripts/app/account/templates/profile.html',
            controller: detailsController,
             resolve: {
               profile:dataResource.profile
            }

        },
        images:{
            templateUrl:'/javascripts/app/account/templates/images.html',
            controller:imagesController,
              resolve: {
               profile:dataResource.profile
            }
        }
    }
    return {
        profile: views.profile,
        images:views.images
    }
})
