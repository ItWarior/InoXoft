const router = require('express').Router();
const path = require('path');

const user_middlewares = require(path.join(__dirname, '../', 'middlewares', 'users.middlewares.js'))

const { usersCotroller } = require(path.join(__dirname, '../', 'controllers'));

router.get('/', usersCotroller.get_all_users);

router.get('/:user_id', user_middlewares.is_user_by_id, usersCotroller.get_user_by_id);

router.post('/register', user_middlewares.is_user_before_register, usersCotroller.add_new_user);

router.post('/update/:email', user_middlewares.is_user_by_email, usersCotroller.update_exist_user);

router.delete('/delete/:email', user_middlewares.is_user_by_email, usersCotroller.delete_user_by_id);

module.exports = router;