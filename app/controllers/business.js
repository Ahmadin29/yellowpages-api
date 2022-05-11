const express = require('express');
const SHA256 = require("crypto-js/sha256");
const authentication = require('../middleware/authentication');

const route = express.Router();

route.get('/')

module.exports = route;