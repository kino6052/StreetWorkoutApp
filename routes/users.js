var express = require('express');
var router = express.Router();
var userService = require('../services/user-services');


router.get('/', function(req, res, next) {
   res.send('users...'); 
});

/* GET users listing. */
router.get('/create', function(req, res, next) {
  res.render('users/create', { title: 'Express', layout: 'empty_layout'});
});

/* GET users listing. */
router.post('/create', function(req, res, next) {
    userService.addUser(req.body, function(err) {
        if (err) {
            var  vm = {
            title: "Create an Account",
            input: req.body,
            error: 'Something Went Wrong',
            layout: 'empty_layout'
            };
            return res.render('users/create', vm); 
        }
        req.login(req.body, function(err) {
            res.redirect('/');
        });
    });
});



module.exports = router;
