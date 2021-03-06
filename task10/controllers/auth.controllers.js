const { ActionTocen, OAuth, Users } = require('../dbs');

const util = require('../util/user.util');
const { EMAIL_SERVICE, USER_SERVISE, JWT_SERVICE } = require('../services');
const { EMAIL_ACTIONS_ENAM, CONSTANTS } = require('../configs');
const OwnError = require('../errors/errorHendler');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, log_pas_data } = req;

            if (!user) {
                res.json('User is not found');
            }

            await USER_SERVISE.compare(log_pas_data.password, user.password);

            const new_token_pair = JWT_SERVICE.generete_token_pair();

            await OAuth.create({ ...new_token_pair, user: user._id });

            res.json({
                ...new_token_pair,
                norm_user: util.user_normalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATIO);

            await OAuth.deleteOne({ access_token: token });

            res.json('OK logouet');
        } catch (e) {
            next(e);
        }
    },
    logout_from_all: async (req, res, next) => {
        try {
            const { curent_user } = req;

            const deleted_coun = await OAuth.deleteMany({ user: curent_user._id });

            res.json(`You logout from ${deleted_coun.deletedCount} devices`);
        } catch (e) {
            next(e);
        }
    },
    refresh_token: async (req, res, next) => {
        try {
            const token = req.get(CONSTANTS.AUTHORIZATIO);
            const { curent_user } = req;

            const new_token_pair = JWT_SERVICE.generete_token_pair();

            await OAuth.updateOne({ refresh_token: token }, { ...new_token_pair, user: curent_user._id });

            res.json({
                ...new_token_pair,
                user: curent_user._id
            });
        } catch (e) {
            next(e);
        }
    },
    sand_email_forgot_password: async (req, res, next) => {
        try {
            const { user } = req;

            const action_token = JWT_SERVICE.generete_action_token();

            await ActionTocen.create({ action_token, user: user._id });

            await EMAIL_SERVICE.send_mail(
                user.email,
                EMAIL_ACTIONS_ENAM.FORGOT_PASSWORD,
                { forgot_password_url: `https://inoxoft.com/forgot?token=${action_token}` }
            );

            res.json('Email was send');
        } catch (e) {
            next(e);
        }
    },
    update_user_password: async (req, res, next) => {
        try {
            const { new_password, faund_db_token } = req;
            const curent_user = faund_db_token.user;

            if (!faund_db_token) {
                throw new OwnError(404, 'Token is not faund in dbs');
            }

            JWT_SERVICE.verify_action_token(faund_db_token.action_token);

            await ActionTocen.deleteMany({ user: curent_user._id });

            const hash_new_password = await USER_SERVISE.hash(new_password);

            await Users.findByIdAndUpdate(curent_user._id, { password: hash_new_password });

            const deleted_coun = await OAuth.deleteMany({ user: curent_user._id });

            res.json(`You changed your password and logout from ${deleted_coun.deletedCount} devices`);
        } catch (e) {
            next(e);
        }
    }
};
