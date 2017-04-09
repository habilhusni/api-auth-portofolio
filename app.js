var express 						= require('express');
var bodyParser 					= require('body-parser');
var path 								= require('path');
var mongoose 						= require('mongoose');
mongoose.connect('mongodb://localhost/portofolio');
var Users 							= require('./models/auth.js');
const passport          = require('passport');
const Strategy          = require('passport-local').Strategy;
const jwt               = require('jsonwebtoken');
const passwordHash      = require('password-hash');
var app 								= express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

var index = require('./routes/index');
var users = require('./routes/users');

app.use('/', index);
app.use('/users', users);

// app.use('/', (req, res, next) => {
// 	res.send('connect');
// })

passport.use(new Strategy(
	function(email, password, cb) {
		Users.findOne({ email: email }, function(err, user) {
			if(err) res.send(err.message);
			let isVerified = passwordHash.verify(password, user.password);
			console.log(isVerified);
			console.log(user.username);
			if(user.username == username && isVerified) {
				console.log(username);
				cb(null, user);
			}else {
				cb('USERNAME AND PASSWORD NOT MATCH!')
			}
		});
	}
))

app.use(passport.initialize());

app.use('/login', passport.authenticate('local', { session: false }), (req,res,next) => {
	var token = jwt.sign({username: req.user.username, role: req.user.role}, process.env.SECRETKEYS);
    res.send(token);
})

app.listen(3000);

module.exports = app;