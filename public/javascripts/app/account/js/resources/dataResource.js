
define(['app/account/models/Profile', 'app/repo/profile'], function (Profile, profileRepository) {

    var profile = function (profileRepository) {
        return new Profile(profileRepository).fetch();
    }

    return {

        profile: profile

    }

})


