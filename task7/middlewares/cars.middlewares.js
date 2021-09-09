const { Cars } = require('../dbs');
const OwnError = require('../errors/errorHendler');
const car_validator = require('../validators/cars.validator');

module.exports = {
    is_car_by_dynemic_params: (vin_code, search_in, db_field = vin_code) => async (req, res, next) => {
        try {
            const value = req[search_in][vin_code];

            const car = await Cars.findOne({ [db_field]: value });

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },
    is_valid_car: (req, res, next) => {
        try {
            const { error, value } = car_validator.create_car_validator.validate(req.body);

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
