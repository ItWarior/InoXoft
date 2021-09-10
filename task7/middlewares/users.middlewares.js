const OwnError = require('../errors/errorHendler');
const { USER_SERVISE } = require('../services');
const { USER_VALIDATOR } = require('../validators');

module.exports = {
    is_user_by_dynamic_params: (dynamic_param, search_in, db_field = dynamic_param) => async (req, res, next) => {
        try {
            const value = req[search_in][dynamic_param];

            const user = await USER_SERVISE.is_there_same_email(db_field, value);

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },
    is_valid_user: (req, res, next) => {
        try {
            const { error, value } = USER_VALIDATOR.create_user_validator.validate(req.body);

            if (error) {
                throw new OwnError(400, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    },
    is_email_password_valid: (req, res, next) => {
        try {
            const { error, value } = USER_VALIDATOR.login_user_validator.validate(req.body);

            if (error) {
                throw new OwnError(400, error.details[0].message);
            }

            req.log_pas_data = value;

            next();
        } catch (e) {
            next(e);
        }
    }

};
