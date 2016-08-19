define([]

, function () {

    var controller = function ($scope,profile) {

        $scope.profile=profile;

        $scope.actions={};
        $scope.actions.save=function(){
            $scope.profile.save().then(function(res){
            });
        }

    }

    return controller;

})

