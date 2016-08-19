var express=require('express');
var router=express.Router();

var mongoose=require('mongoose');
var Profile=require('../models/profile');

var formidable=require('formidable')
var path = require('path');
var fs = require('fs');

router.post('/upload',function(req,res,next){
	
    
	  var form = new formidable.IncomingForm();
	   form.parse(req, function (err, fields, files) {
        var file = files.file;
		
        var tempPath = file.path;
		 var targetPath = path.resolve('./public/uploads/'+ file.name);
		 fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err
            }

             Profile.findById(req.user._id,function(err,data){
                if(err){
                    throw err;
                }
                if(data){
                    var image={filename:file.name};
                    data.images.push(image);
                    data.save(function(err,saved){
                        if(err){
                            throw err;
                        }else{
                           return res.json(image);
                        }
                    })
                }
               
            });

        })
      
    });
})



module.exports=router;
