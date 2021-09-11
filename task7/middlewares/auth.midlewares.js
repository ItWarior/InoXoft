const { OAuth } = require('../dbs');
const { CONSTANTS, DBS_TABLES_ENAM } = require('../configs');
const OwnError = require('../errors/errorHendler');
const { JWT_SERVICE } = require('../services');

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
    }

};
