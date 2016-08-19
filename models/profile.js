var mongoose=require('mongoose');
var Person=require('./valueObjects/person');
var Image=require('./valueObjects/image')
var Schema=mongoose.Schema;

var ProfileSchema=new Schema({
    details:Person,
    images:[Image]//[mongoose.model('Image')]
});

module.exports=mongoose.model('Profile',ProfileSchema);

