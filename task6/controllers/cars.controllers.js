const { Cars } = require('../dbs');
const OwnError = require('../errors/errorHendler');

module.exports = {

    get_all_cars: async (req, res, next) => {
        try {
            res.json(await Cars.find({}));
        } catch (e) {
            next(e);
        }
    },
    get_car_by_code: (req, res, next) => {
        try {
            const { car } = req;

            if (car) {
                res.json(car);
                return;
            }

            throw new OwnError(404, 'car is not faund');
        } catch (e) {
            next(e);
        }
    },
    add_new_car: async (req, res, next) => {
        try {
            const { car } = req;

            if (car) {
                throw new OwnError(401, 'This car is alredy exist');
            }

            const new_car = await Cars.create(req.body);

            res.json(new_car);
        } catch (e) {
            next(e);
        }
    },
    drop_car: async (req, res, next) => {
        try {
            const { car } = req;

            if (car) {
                const result = await Cars.deleteOne(car);
                res.json(`You delete ${result.deletedCount} car`).status(200);
                return;
            }
            throw new OwnError(404, 'Car is not faund');
        } catch (e) {
            next(e);
        }
    },
    update_car: async (res, req, next) => {
        try {
            const { car } = res;
            const new_value = res.body;

            if (car && new_value) {
                const update_car = await Cars.updateOne(car, new_value);
                req.json(update_car);
                return;
            }

            throw new OwnError(401, 'data is invalid');
        } catch (e) {
            next(e);
        }
    }

};
