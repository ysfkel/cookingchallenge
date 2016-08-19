
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var passportLocalMongoose=require('passport-local-mongoose');
var bCrypt=require('bCrypt');

var userSchema=new Schema({
      dateCreated:{type:Date,default:Date.now},
      //local:{
        username:String,
        password:String,
      //},
    facebook:{
        id:String,
        token:String,
        email:String,
        name:String,
        displayName:String
    }
})

userSchema.methods.generateHash=function(password){
    return bCrypt.hashSync(password,bCrypt.genSaltSync(9));
}

userSchema.methods.validatePassword=function(password){
    return bCrypt.compareSync(password,this.password);
}

userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema);

