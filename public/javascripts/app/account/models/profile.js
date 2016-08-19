define([], function () {

    function Profile(service) {
        this.service = service;
        this.data = {};
        this.data.details = {};

        this.data.details = {
            _id: null,
            name: null,
            nationality: null,
            country: null,
            mobile: null
        }
        this.data.images = []
    }

    Profile.prototype.save = function () {
        var profile = this; 


        return this.service.save(this.data).$promise.then(function (res) {
            profile.data.details._id = res._id;
            return res;
        });

    }

    Profile.prototype.fetch = function () {
        var profile = this;
        return this.service.get({ id: 1 }).$promise.then(function (res) {
            profile.data = res;
            return profile;
        });
    }

    return Profile;


})
