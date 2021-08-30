const router = require('express').Router();
const path = require('path');

const  user_middlewares  = require(path.join(__dirname, '../', 'middlewares', 'users.middlewares.js'))

const USERS_CONTROLLERS = require(path.join(__dirname, '../', 'controllers', 'users.controllers.js'));

router.get('/', USERS_CONTROLLERS.get_all_users);

router.get('/:user_id',user_middlewares.is_user_by_id, USERS_CONTROLLERS.get_user_by_id);

router.post('/register',user_middlewares.is_user_exist, USERS_CONTROLLERS.add_new_user);

router.delete('/delete/:email', USERS_CONTROLLERS.delete_user_by_id);

module.exports = router;