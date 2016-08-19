define([
'app/account/js/resources/viewResource'

], function (
  viewResource
  ) {

    var profile = {
        'url': '/index',
        views: {
            'view-container': viewResource.profile
        }
    }
     var images = {
        'url': '/images',
        views: {
            'view-container': viewResource.images
        }
    }

    return {

        profile: profile,
        images:images

    }

})

