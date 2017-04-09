'use strict'
var jwt = require('jsonwebtoken');

let justAdmin = function(req, res, next) {

	jwt.verify(req.headers.token, 'secret', function(err, decoded) {
		console.log(decoded)
		if(decoded) {
			if(decoded.is_Admin == true) {
				next();
			}else {
				res.send('you are not an Admin!');	
			}
		}else {
			res.send(err);
		}
	})

}

let adminAuth = function(req, res, next) {

	jwt.verify(req.headers.token, 'secret', function(err, decoded) {
		// console.log(decoded)
		if(decoded) {
			if(decoded.is_Admin == true) {
				if(decoded.id == req.params.id) {
					next();
				}else {
					res.send('you are not allowed for this ID!');
				}
			}else {
				res.send('you are not admin!');	
			}
		}else {
			res.send(err);
		}
	})

}

module.exports = {
  justAdmin,
  adminAuth
}