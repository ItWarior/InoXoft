const Joi = require('joi');

const create_car_validator = Joi.object({

    model: Joi.string().min(2).max(10).trim()
        .required(),
    power: Joi.number().min(0).max(1000).required(),
    was_used: Joi.boolean().required(),
    vin_code: Joi.string().alphanum().min(10).max(30)
        .required()

});

module.exports = {

    create_car_validator

};
