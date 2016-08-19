var express=require('express');
var app=express();
var appSetting=require('./app.settings')(app);
var appMiddlewares=require('./app.middleware')(app,express);
var appStart=require('./app.start');

app.get('/',function(req,res){
    res.render('index');
})


appStart(app);

module.exports=app;


