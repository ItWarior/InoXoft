const router = require('express').Router();

const user_middlewares = require('../middlewares/users.middlewares');

const { usersController } = require('../controllers');

router.get('/', usersController.get_all_users);

router.get('/:user_id',
    user_middlewares.is_user_by_dynamic_params('user_id', 'params', '_id'),
    usersController.get_user_by_email);

router.post('/register',
    user_middlewares.is_valid_user,
    user_middlewares.is_user_by_dynamic_params('email', 'body'),
    usersController.add_new_user);

router.put('/update/:email',
    user_middlewares.is_user_by_dynamic_params('email', 'params'),
    usersController.update_exist_user);

router.delete('/delete/:user_id',
    user_middlewares.is_user_by_dynamic_params('user_id', 'params', '_id'),
    usersController.delete_user_by_id);

module.exports = router;
