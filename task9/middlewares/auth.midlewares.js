const { OAuth, ActionTocen } = require('../dbs');
const OwnError = require('../errors/errorHendler');
const { CONSTANTS, DBS_TABLES_ENAM } = require('../configs');
const { JWT_SERVICE } = require('../services');
const { USER_VALIDATOR } = require('../validators');

module.exports = {
    check_access_token: async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATIO);

            if (!token) {
                throw new OwnError(401, 'No token');
            }
            JWT_SERVICE.verify_tokens(token);
            const faund_db_token = await OAuth.findOne({ access_token: token }).populate(DBS_TABLES_ENAM.USER);

            if (!faund_db_token) {
                throw new OwnError(401, 'Invalid token');
            }
            req.curent_user = faund_db_token.user;
            next();
        } catch (e) {
            next(e);
        }
    },
    check_refresh_token: async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATIO);

            if (!token) {
                throw new OwnError(401, 'No token');
            }

            JWT_SERVICE.verify_tokens(token, 'refresh_token');
            const faund_db_token = await OAuth.findOne({ refresh_token: token }).populate(DBS_TABLES_ENAM.USER);

            if (!faund_db_token) {
                throw new OwnError(401, 'Invalid token');
            }
            req.curent_user = faund_db_token.user;
            next();
        } catch (e) {
            next(e);
        }
    },
    check_action_token: async (req, res, next) => {
        try {
            const { new_password, action_token } = req.body;

            const faund_db_token = await ActionTocen.findOne({ action_token }).populate(DBS_TABLES_ENAM.USER);

            req.faund_db_token = faund_db_token;
            req.new_password = new_password;
            next();
        } catch (e) {
            next(e);
        }
    },
    is_new_password_tocen_valid: (req, res, next) => {
        try {
            const { error } = USER_VALIDATOR.forgot_pass_validator.validate(req.body);

            if (error) {
                throw new OwnError(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

};
