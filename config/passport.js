
var LocalStrategy = require('passport-local').Strategy;
var authConfig = require('./oAuth');
var User = require('../models/user');
var FacebookStrategy = require('passport-facebook').Strategy;
var Profile = require('../models/profile');

var config = function (passport) {

    passport.use(new LocalStrategy(User.authenticate()));

    passport.serializeUser(function (user, callback) {
        callback(null, user.id);
    });

    passport.deserializeUser(function (id, callback) {
        User.findById(id, function (err, user) {
            callback(err, user);
        });
    });

    //
    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, LocalStrategySignUpCallBack));

    function LocalStrategySignUpCallBack(req, email, password, callback) {

        process.nextTick(function () {

            User.findOne({ 'username': email }, function (err, user) {

                if (err) {
                    return callback(err);
                }
                if (user) {
                    return callback(null, false, req.flash('signupMessage', 'That email is already taken'))
                }
                else {
                    var newUser = new User();
                    newUser.username = email;
                    newUser.password = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err) {
                            throw err;
                        }
                        return callback(null, newUser);
                    })
                }
            });
        });
    }

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, LocalStrategySignInCallBack));

    function LocalStrategySignInCallBack(req, email, password, done) {
        process.nextTick(function () {
            User.findOne({ username: email }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }
                if (!user.validatePassword(password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        });
    }


    passport.use(new FacebookStrategy({
        clientID: authConfig.facebookAuth.clientId,
        clientSecret: authConfig.facebookAuth.clientSecret,
        callbackURL: authConfig.facebookAuth.callbackURL,//"http://localhost:3000/auth/facebook/callback"
        profileFields: authConfig.facebookAuth.profileFields
    },
        function (accessToken, refreshToken, profile, callback) {
            process.nextTick(function () {
            
                User.findOne({ 'facebook.id': profile.id }, function (err, user) {
                    if (err) {
                        return callback(err);
                    } else if (user) {
                        return callback(null, user);
                    } else {
                        var newUser = new User();
                        newUser.username= (profile.emails && profile.emails[0]) ? profile.emails[0].value : null;
                        newUser._id=profile.id;
                        newUser.facebook.id = profile.id,
                            newUser.facebook.token = profile.token,
                            newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName,
                            newUser.facebook.email = (profile.emails && profile.emails[0]) ? profile.emails[0].value : null,
                            newUser.facebook.displayName = profile.displayName;
                        newUser.save(function (err,savedNewUser) {
                            if (err) {
                                return err;
                            }

                                var profile = new Profile();
                                profile.details.name =  profile.displayName;
                                profile._id = savedNewUser._id;

                                profile.save(function (err, data) {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                } else {
                                     return callback(null, savedNewUser);
                                }
                                })

                          
                        })
                    }
                });
            });
        }
    ));
}

module.exports = config;
