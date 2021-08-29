const router = require('express').Router();
const path = require('path');

const AUTH_CONTROLLERS = require(path.join(__dirname, '../', 'controllers', 'auth.controllers.js'));

router.post('/', AUTH_CONTROLLERS.auth);

module.exports = router;