const router = require('express').Router();

const { authController } = require('../controllers');
const { USERS_MIDLEWARES, AUTH_MIDLEWARES } = require('../middlewares');

router.post(
    '/login',
    USERS_MIDLEWARES.is_email_password_valid,
    USERS_MIDLEWARES.is_user_by_dynamic_params('email', 'body'),
    authController.login

);
router.post(
    '/logout',
    AUTH_MIDLEWARES.check_access_token,
    authController.logout
);
router.post(
    '/logout_from_all',
    AUTH_MIDLEWARES.check_access_token,
    authController.logout_from_all
);
router.post(
    '/refresh',
    AUTH_MIDLEWARES.check_refresh_token,
    authController.refresh_token
);

module.exports = router;
