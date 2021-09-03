const router = require('express').Router();
const path = require('path');

const user_middlewares = require(path.join(__dirname, '../', 'middlewares', 'users.middlewares.js'))

const { usersCotroller } = require('../controllers');

router.get('/', usersCotroller.get_all_users);

router.get('/:email',
   user_middlewares.is_user_by_email,
   usersCotroller.get_user_by_email
);

router.post('/register',
   user_middlewares.is_valid_user,
   user_middlewares.is_user_by_body,
   usersCotroller.add_new_user
);

router.put('/update/:email',
   user_middlewares.is_user_by_email,
   usersCotroller.update_exist_user
);

router.delete('/delete/:email',
   user_middlewares.is_user_by_email,
   usersCotroller.delete_user_by_id
);

module.exports = router;