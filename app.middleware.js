var path=require('path');
var bodyParser = require('body-parser');
var app_secret = require('./config/app.infra.config').app_secret;
var passport=require('passport');
var indexRoutes=require('./routes/index');
var accountRoutes=require('./routes/account');
var session=require('express-session');
var flash=require('connect-flash');
var imageApi=require('./api/apiImages');
var profileApi=require('./api/profile');

module.exports=function(app,express){  
   
   app.use(express.static(path.join(__dirname, 'public')));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended:false}));
   app.use(session({
       secret:'secrettext',
       saveUninitialized:true,
       resave:true
   }));
   app.use(passport.initialize());
   app.use(passport.session());
   require('./config/passport')(passport);
   app.use(flash());
   //plug apis
    app.all('*', function(req,res,next) {
    if (req.path === '/signin' || req.path === '/signup' ||
        req.path==='/' || req.path==='/auth/facebook' || req.path==='/auth/facebook/callback') 
        next();
    else
        ensureAuthenticated(req,res,next);  
    });
   app.use('/',indexRoutes);
   app.use('/',accountRoutes);
   app.use('/api',imageApi);
   app.use('/api',profileApi);
  
}

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next(); }

  // denied. redirect to login
  res.redirect('/signin')
}
