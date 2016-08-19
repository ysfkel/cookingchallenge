var path = require('path');
var app_secret = require('./config/app.infra.config').app_secret;


module.exports=function(app){
   app.set('views', path.join(__dirname, 'views'));
   app.set('view engine', 'jade');
   app.set('superSecret',app_secret);
}