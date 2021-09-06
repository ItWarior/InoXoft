const router = require('express').Router();

const { authController } = require('../controllers');

router.post('/', authController.auth);

module.exports = router;
