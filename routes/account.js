var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Profile = require('../models/profile');
var passport = require('passport');
var authConfig = require('../config/oAuth');
var Client = require('node-rest-client').Client;
router.get('/signin', function (req, res) {
  res.render('index');
});

router.post('/signin', function (req, res, next) {
  passport.authenticate('local-login', function (err, user) {
    if (err) { return next(err); }

    if (!user) { return res.render('index'); }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
    })

   res.render('user-profile');

  })(req, res, next);
});

router.get('/signup', function (req, res) {
  res.render('register', { message: req.flash('signupMessage') });
});


router.post('/signup', function (req, res, next) {
  passport.authenticate('local-signup', function (err, user, info) {
    if (err) { return next(err); }

    if (!user) { return res.redirect('/login'); }

    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
    })

    var profile = new Profile();
    profile.details = req.body;
    profile._id = user._id;

    profile.save(function (err, data) {
      if (err) {
        console.log(err);
        throw err;
      } else {
        res.render('user-profile');
      }
    })


  })(req, res, next);
});


router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/')
});

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: ['email'], callbackURL: authConfig.facebookAuth.callBackUrl }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/account#index', callbackURL: authConfig.facebookAuth.callBackUrl }));



module.exports = router;