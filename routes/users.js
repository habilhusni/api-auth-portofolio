'use strict'

var express = require('express');
var router = express.Router();
var autent = require('../autentikasi/auths');
var control = require('../controller/userController')

router.get('/', control.g)