const router = require('express').Router();

const { USERS_MIDLEWARES, AUTH_MIDLEWARES } = require('../middlewares');

const { usersController } = require('../controllers');

router.get('/', usersController.get_all_users);

router.post('/register',
    USERS_MIDLEWARES.is_valid_user,
    USERS_MIDLEWARES.is_user_by_dynamic_params('email', 'body'),
    usersController.add_new_user);

router.post('/create_admin',
    USERS_MIDLEWARES.is_user_by_dynamic_params('_id', 'body'),
    AUTH_MIDLEWARES.check_access_token,
    usersController.update_user_to_admin);

router.put('/update/:user_id',
    USERS_MIDLEWARES.is_user_by_dynamic_params('user_id', 'params', '_id'),
    AUTH_MIDLEWARES.check_access_token,
    usersController.update_exist_user);

router.delete('/delete/:user_id',
    USERS_MIDLEWARES.is_user_by_dynamic_params('user_id', 'params', '_id'),
    AUTH_MIDLEWARES.check_access_token,
    usersController.delete_user_by_id);

router.get('/:user_id',
    USERS_MIDLEWARES.is_user_by_dynamic_params('user_id', 'params', '_id'),
    usersController.get_user_by_id);
module.exports = router;
