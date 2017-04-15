'use strict'
require('dotenv').config();
var db = require('../models');
var jwt = require('jsonwebtoken');
const password = require('password-hash');

let getLogin = function(req, res, next) {

  db.User.findOne({
    where: {
      name: req.body.name
    }
  })
  .then(user => {
      var token = jwt.sign({name: user.name, is_Admin: user.is_Admin, id: user.id}, process.env.SECRETKEYS);
      res.send(token);
  })
  .catch(err => {
    res.send(err.message)
  })
   // return newdate
 }

let getSignUp = function(req, res, next) {
  if(!req.body.password) res.send({errors: {
                                password: 'value is undefined'
                              }});
                              // Creating hash
  let hashPassword = password.generate(req.body.password);

  db.User.create({
    name: req.body.name,
    email: req.body.email,
    is_Admin: req.body.is_Admin,
    password: hashPassword
  })
  .then(user => {
    if((user.password=='') || (user.name=='')) {
      res.send('Please insert username and password!')
    }else {
      res.send(user);
    }
  })
  .catch(err => {
    res.send(err.message)
  })

}

let getUser = function(req, res, next) {

  db.User.findAll()
  .then(users => {
    res.send(users);
  })
  .catch(err => {
    res.send(err.message)
  })

   // return newdate
 }

let getUserById = function(req, res, next) {

  db.User.findById(req.params.id)
  .then(user => {
    res.send(user);
  })
  .catch(err => {
    res.send(err.message)
  })

   // return newdate
 }

let createUser = function(req, res, next) {

  db.User.create(req.body)
  .then(user => {
    res.send(user)
  })
  .catch(err => {
    res.send(err.message)
  })

   // return newdate
 }

let deleteUser = function(req, res, next) {

  db.User.destroy({
       where: {
         id: req.params.id
       }
     })
     .then((data) => {
       res.send(data);
     })
     .catch((err) => {
       res.send(err.message)
     })

   // return newdate
 }

let updateUser = function(req, res, next) {
    var data = req.body;

    db.User.update(data, {
      where: {
        id: req.params.id
      }
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.send(err.message)
    })

   // return newdate
 }

 module.exports = {
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getLogin,
  getSignUp
}
