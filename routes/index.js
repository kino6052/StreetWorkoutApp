var express = require('express');
var router = express.Router();
var passport = require('passport');
var userService = require('../services/user-services');
var config = require('../config.js');
var mongojs = require("mongojs");
var db = mongojs(config.statsUri, ["statistics"]);
var statsService = require('../services/stats-services.js');
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


/* Get Homepage Info */
router.get('/stats/:username?', function(req, res, next) {
  var username = req.user.username;
  //userService.findStats(username, config.getCurrentDate(), next);
  res.send("test");
});

router.post('/stats', function(req, res, next) {
  statsService.findStats("test", function(err, doc){
    if (doc == null){
      // Put it into a service file!
      var newDoc = {date: config.getCurrentDate(), pushups: 0};
      db.statistics.insert(newDoc);
      return res.json(newDoc);
    }
    return res.json(doc);
  });
});

router.post('/addpushups', function(req, res, next){
  statsService.addPushups(config.getCurrentDate(),10, function(err, doc){
    if (err){
      return next(err);
    }
    return res.json(doc);    
  });  
});
//console.log(body);

module.exports = router;
