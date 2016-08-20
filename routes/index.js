var app=require('express')();

app.get('/account',function(req,res){
 
   res.render('user-profile') 
});

module.exports = app;
