const router = require('express').Router();
const path = require('path');

const USERS_CONTROLLERS = require(path.join(__dirname, '../', 'controllers', 'users.controllers.js'));

router.get('/', USERS_CONTROLLERS.get_all_users);

router.get('/:user_id', USERS_CONTROLLERS.get_user_by_id);

router.post('/register', USERS_CONTROLLERS.add_new_user);

router.delete('/delete/:email', USERS_CONTROLLERS.delete_user_by_id);

module.exports = router;