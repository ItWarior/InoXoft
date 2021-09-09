const OwnError = require('../errors/errorHendler');
const { is_there_same_email } = require('../services/user.service');
const user_validator = require('../validators/user.validator');

module.exports = {
    is_user_by_dynamic_params: (dynamic_param, search_in, db_field = dynamic_param) => async (req, res, next) => {
        try {
            const value = req[search_in][dynamic_param];

            const user = await is_there_same_email(db_field, value);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    is_valid_user: (req, res, next) => {
        try {
            const { error, value } = user_validator.create_user_validator.validate(req.body);

            if (error) {
                throw new OwnError(400, error.details[0].message);
            }

            req.body = value;

            next();
        } catch (e) {
            next(e);
        }
    }

};
