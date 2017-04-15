var express = require('express');
var app = require('../app');
var router = express.Router();
var db = require('../models');
var control = require('../controller/controller');
var aut = require('../autentikasi/auths');
var jwt = require('jsonwebtoken');
const passport          = require('passport');
const Strategy          = require('passport-local').Strategy;
const passwordHash      = require('password-hash');

// login verify
passport.use(new Strategy(
	function(name, password, cb) {
		User.findOne({ name: name }, function(err, user) {
			if(err) res.send(err.message);
			let isVerified = passwordHash.verify(password, user.password);
			// console.log(isVerified);
			// console.log(user.username);
			if(user.username == username && isVerified) {
				// console.log(username);
				cb(null, user);
			}else {
				cb('USERNAME AND PASSWORD NOT MATCH!')
			}
		});
	}
))

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', control.getSignUp);

router.post('/signin', passport.authenticate('local', { session: false }), control.getLogin);

// router.get('/users', aut.justAdmin, control.getUser);

router.get('/users', control.getUser);

router.get('/users/:id', aut.loginAuth, control.getUserById);

router.post('/users', aut.loginAuth, control.createUser);

router.delete('/users/:id', aut.loginAuth, control.deleteUser);

router.put('/users/:id', aut.loginAuth, control.updateUser);

module.exports = router;
