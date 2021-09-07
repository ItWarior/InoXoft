const router = require('express').Router();

const user_middlewares = require('../middlewares/users.middlewares');

const { usersCotroller } = require('../controllers');

router.get('/', usersCotroller.get_all_users);

router.get('/:email',
    user_middlewares.is_user_by_dynamic_params('email', 'params'),
    usersCotroller.get_user_by_email);

router.post('/register',
    user_middlewares.is_valid_user,
    user_middlewares.is_user_by_dynamic_params('email', 'body'),
    usersCotroller.add_new_user);

router.put('/update/:email',
    user_middlewares.is_user_by_dynamic_params('email', 'params'),
    usersCotroller.update_exist_user);

router.delete('/delete/:email',
    user_middlewares.is_user_by_dynamic_params('email', 'params'),
    usersCotroller.delete_user_by_id);

module.exports = router;
