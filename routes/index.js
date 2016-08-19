var app=require('express')();

app.get('/account',function(req,res){
 
   res.render('account') 
});

module.exports = app;
