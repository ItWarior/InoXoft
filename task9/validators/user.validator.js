const Joi = require('joi');
const { CONSTANTS, USER_ROLES } = require('../configs');

const girl_subject_schema = Joi.object({
    name: Joi.string(),
    age: Joi.number().min(18).max(50)
});

const create_user_validator = Joi.object({
    name: Joi.string().alphanum().min(4).max(30)
        .trim()
        .required(),
    password: Joi.string().regex(CONSTANTS.PASSWORD_REGEXP).trim().required(),
    born_year: Joi.number().integer().min(CONSTANTS.CURENT_YEAR - 120).max(CONSTANTS.CURENT_YEAR - 10),
    email: Joi.string().regex(CONSTANTS.EMAIL_REGEXP).trim().required(),
    role: Joi.string().allow(...Object.values(USER_ROLES)),

    car: Joi.boolean(),

    girls: Joi.array()
        .items(girl_subject_schema)
        .when('car', { is: true, then: Joi.required() })
});

const login_user_validator = Joi.object({
    email: Joi.string().regex(CONSTANTS.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(CONSTANTS.PASSWORD_REGEXP).trim().required()
});

const password_validator = Joi.object({
    name: Joi.string().alphanum().min(4).max(30)
        .trim(),
    password: Joi.string().regex(CONSTANTS.PASSWORD_REGEXP).trim().required(),
    born_year: Joi.number().integer().min(CONSTANTS.CURENT_YEAR - 120).max(CONSTANTS.CURENT_YEAR - 10),
    email: Joi.string().regex(CONSTANTS.EMAIL_REGEXP).trim()
});

const forgot_pass_validator = Joi.object({

    new_password: Joi.string().regex(CONSTANTS.PASSWORD_REGEXP).trim().required(),
    action_token: Joi.string().required().trim()
});
module.exports = {
    create_user_validator,
    login_user_validator,
    password_validator,
    forgot_pass_validator
};
