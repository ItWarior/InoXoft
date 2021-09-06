const OwnError = require('../errors/errorHendler');
const { Users } = require('../dbs');
const user_util = require('../util/user.util');

const { hash } = require('../services/user.service');

module.exports = {

    get_all_users: async (req, res, next) => {
        try {
            res.json(await Users.find({}));
        } catch (e) {
            next(e);
        }
    },

    get_user_by_email: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new OwnError(404, 'user is not faund');
            }

            const normalizated_user = user_util.user_normalizator(user);

            res.json(normalizated_user);
        } catch (e) {
            next(e);
        }
    },
    add_new_user: async (req, res, next) => {
        try {
            const { user } = req;
            const new_user = req.body;

            if (user) {
                throw new OwnError(409, 'There is the same user');
            }

            const hash_password = await hash(new_user.password);

            const created_user = await Users.create({ ...new_user, password: hash_password });

            const normalizated_user = user_util.user_normalizator(created_user);

            res.json(normalizated_user).status(201);
        } catch (e) {
            next(e);
        }
    },
    update_exist_user: async (req, res, next) => {
        try {
            const { user } = req;

            const new_info = req.body;

            if (user && new_info) {
                const update_user = await Users.updateOne(user, new_info);
                res.json(update_user);
                return;
            }

            throw new OwnError(404, 'Data is not valid');
        } catch (e) {
            next(e);
        }
    },
    delete_user_by_id: async (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new OwnError(404, 'User is not faund');
            }

            const delete_user = await Users.deleteOne({ email: user.email });

            res.json(`You delete ${delete_user.deletedCount} user`);
        } catch (e) {
            next(e);
        }
    }

};
