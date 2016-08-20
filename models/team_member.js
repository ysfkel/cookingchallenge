var mongoose=require('mongoose');
var Person=require('./valueObjects/person');
var Image=require('./valueObjects/Image')
var Schema=mongoose.Schema;

var ProfileSchema=new Schema({
    personalDetails:Person,
    images:[mongoose.model('Image')]
});

module.exports=mongoose.model('Profile',ProfileSchema);

