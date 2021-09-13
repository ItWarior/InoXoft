const { OAuth } = require('../dbs');

const util = require('../util/user.util');
const { USER_SERVISE, JWT_SERVICE } = require('../services');
const { CONSTANTS } = require('../configs');

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
    }
};
