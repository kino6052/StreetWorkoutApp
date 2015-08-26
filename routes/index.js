var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-services');
var config = require('../config.js');

/* GET Login Page. */
router.get('/login', function(req, res, next) {
  if (req.user) {
    return res.redirect('/');
  }
  var vm = {
    title: 'Login',
    error: req.flash('error'),
    layout: 'empty_layout'
  };
  res.render('index', vm);
});

router.post('/login', function(req, res, next) {
    if (req.body.rememberme) {
      req.session.cookie.maxAge = config.cookieMaxAge;
    }
    next();
  }, 
  passport.authenticate('local', {
  failureRedirect: "/login", 
  successRedirect: "/" ,
  failureFlash: "Invalid Credentials"
  }));

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  res.render('personal', { title: 'Express'});
});

/* Logout Route */
router.get('/logout', function(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect('/login');
});

//console.log(body);

module.exports = router;
