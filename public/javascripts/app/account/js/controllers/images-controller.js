define(['ngUpload'], function (ngUpload) {

    var controller = function ($scope,Upload,profile) {
      $scope.profile=profile;
       $scope.actions={};
       $scope.file={};
       $scope.actions.save=function(a,b){
           if($scope.file){
                $scope.upload($scope.file);
           }
          
       }

      // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: '/api/upload',
                data: {file: file, 'username':'yusuf'}
            }).then(function (resp) {
                $scope.profile.data.images.push(resp.data);
               
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

    }

    return controller;

})

