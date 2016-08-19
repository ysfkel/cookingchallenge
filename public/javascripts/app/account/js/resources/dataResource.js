
define(['app/account/models/Profile', 'app/repo/profile'], function (Profile, profileRepository) {

    var profile = function (profileRepository) {
        var data = new Profile(profileRepository).fetch();
        return data;
    }

    return {

        profile: profile

    }

})


