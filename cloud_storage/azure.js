
var azure=require('azure-storage')
var multer=require('multer');
var formidable=require('formidable')
var path = require('path');
var fs = require('fs');
var uploads_folder=require('../config/app.infra.config').uploads_folder;
var uploads_folder=require('../config/app.infra.config').uploads_folder;
var sendFile = function(req, res, imageName, cb,blobSvc) {

    var localPath = uploads_folder + imageName;

  blobSvc.createBlockBlobFromLocalFile('images', imageName, localPath, function(error, result, response) {
    if (!error) {
      cb();
    } else {
      console.log('error on image upload is ', error);
      return error;
    }
  });
};

var upload=function(req, res, imageName, callback){
	var accounName='azure_storage_account_name';
    var accountKey='azure_storage_account_key';
  	var retryOperations = new azure.ExponentialRetryPolicyFilter();
	var blobService=azure.createBlobService(accounName,accountKey).withFilter(retryOperations);
	
	blobService.createContainerIfNotExists('images',{publicAccessLevel:'blob'}, function(err,result,response){
		if(!err){
      sendFile(req, res, imageName, callback,blobService)
			console.log('created container')
		}else{
			console.log('err',err)
		}
		
	})
}




module.exports={
	upload:upload
}