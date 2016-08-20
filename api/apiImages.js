var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Profile = require('../models/profile');
var azure = require('../cloud_storage/azure')
var formidable = require('formidable')
var path = require('path');
var fs = require('fs');
var uploads_folder = require('../config/app.infra.config').uploads_folder;
///
router.post('/upload', function (req, res, next) {


    var form = new formidable.IncomingForm();
	   form.parse(req, function (err, fields, files) {
        var file = files.file;

        var tempPath = file.path;
        var targetPath = path.resolve('./public/' + uploads_folder + '/' + file.name);
        fs.rename(tempPath, targetPath, function (err) {
            if (err) {
                throw err
            }

            Profile.findById(req.user._id, function (err, data) {
                if (err) {
                    throw err;
                }
                azure.upload(req, res, file.name, function () {
                    if (data) {
                        var image = { filename: file.name };
                        data.images.push(image);
                        data.save(function (err, saved) {
                            if (err) {
                                throw err;
                            } else {
                                return res.json(image);
                            }
                        })
                    }
                });


            });

        })

    });
})



module.exports = router;
