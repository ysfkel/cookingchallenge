var mongoose=require('mongoose');
var data_connection=require('./config/app.infra.config').data_source;


module.exports=function(app){   
 startDb();
}


function startDb(){
    mongoose.Promise = global.Promise;
    mongoose.connect(data_connection,function(){
          console.log('database started..');
    });
}

