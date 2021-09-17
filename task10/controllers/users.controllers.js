const { Users } = require('../dbs');

const OwnError = require('../errors/errorHendler');
const user_util = require('../util/user.util');

const { EMAIL_SERVICE, USER_SERVISE } = require('../services');
const { USER_VALIDATOR } = require('../validators');
const { EMAIL_ACTIONS_ENAM, USER_ROLES } = require('../configs');

module.exports = {

    get_all_users: async (req, res, next) => {
        try {
            res.json(await Users.find({}));
        } catch (e) {
            next(e);
        }
    },

    get_user_by_id: async (req, res, next) => {
        try {
            const { user } = req;

            await EMAIL_SERVICE.send_mail(user.email, EMAIL_ACTIONS_ENAM.WELCOM, { user_name: user.name });

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

            const length_bds = await Users.collection.count();

            if (user) {
                throw new OwnError(409, 'There is the same user');
            }
            if (length_bds === 0) {
                new_user.role = 'admin';
            }
            const hash_password = await USER_SERVISE.hash(new_user.password);

            const created_user = await Users.create({ ...new_user, password: hash_password });
            await EMAIL_SERVICE.send_mail(new_user.email, EMAIL_ACTIONS_ENAM.REGISTRATION, { user_name: new_user.name });

            const normalizated_user = user_util.user_normalizator(created_user);

            res.json(normalizated_user).status(201);
        } catch (e) {
            next(e);
        }
    },
    update_exist_user: async (req, res, next) => {
        try {
            const { user, curent_user } = req;
            const new_info = req.body;

            if (!user) {
                throw new OwnError(404, 'User is not faund');
            }

            if (user._id.toString() !== curent_user._id.toString()) {
                throw new OwnError(400, 'You haven\'t rights update enather users');
            }

            // eslint-disable-next-line no-prototype-builtins
            if (new_info.hasOwnProperty('password')) {
                const { error, value } = USER_VALIDATOR.update_validator.validate(new_info);

                if (error) {
                    throw new OwnError(400, error.details[0].message);
                }
                const hash_password = await USER_SERVISE.hash(value.password);

                const hach_info = { ...value, password: hash_password };

                const update_user = await Users.updateOne(user, hach_info);
                res.json(update_user);
                return;
            }

            const update_user = await Users.updateOne(user, new_info);
            res.json(update_user);
        } catch (e) {
            next(e);
        }
    },
    delete_user_by_id: async (req, res, next) => {
        try {
            const { user, curent_user } = req;

            const admission_check_user = user._id.toString() !== curent_user._id.toString();
            const admission_check_admin = curent_user.role !== USER_ROLES.ADMIN;

            if (!user) {
                throw new OwnError(404, 'User is not faund');
            }

            if ((admission_check_user && admission_check_admin) || curent_user.role !== USER_ROLES.ADMIN) {
                throw new OwnError(400, 'You haven\'t rights delete enather users');
            }

            await Users.deleteOne({ _id: user._id });

            await EMAIL_SERVICE.send_mail(
                user.email,
                EMAIL_ACTIONS_ENAM.DELETED_ACOUNT,
                {
                    user_name: user.name,
                    curent_user_name: curent_user.name,
                    curent_user_role: curent_user.role,

                }
            );

            await Users.deleteOne({ _id: user._id });

            res.json('You delete your account');
        } catch (e) {
            next(e);
        }
    },
    update_user_to_admin: async (req, res, next) => {
        try {
            const { user, curent_user } = req;

            if (curent_user.get_role() !== USER_ROLES.ADMIN) {
                throw new OwnError(401, 'You are not admin');
            }
            if (!user) {
                throw new OwnError(404, 'User is not faund');
            }
            const new_admin = { user, role: curent_user.role };

            await Users.updateOne(user, new_admin);

            await EMAIL_SERVICE.send_mail(
                user.email,
                EMAIL_ACTIONS_ENAM.FOR_NEW_ADMIN,
                {
                    user_name: user.name,
                    curent_user_name: curent_user.name,
                    curent_user_role: curent_user.role,

                }
            );

            res.json(`${user.name} is admin now`);
        } catch (e) {
            next(e);
        }
    }

};
