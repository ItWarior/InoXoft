const { Cars } = require('../dbs');
const OwnError = require('../errors/errorHendler.js');
const car_validator = require('../validators/cars.validator');

module.exports = {

   is_car_exist: async (req, res, next) => {

      try {

         const find_car = await Cars.findOne(req.params);

         if (find_car) {

            req.car = find_car;
            next();
            return
         }

         throw new OwnError(404, 'Car is not faund');
      } catch (e) {

         next(e);

      }

   },
   is_car_exist_before_add: async (req, res, next) => {

      try {

         const find_car = await Cars.findOne(req.body);

         if (!find_car) {

            req.update_to_car = req.body;
            next();
            return
         }

         throw new OwnError(404, 'There is the same car');
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
         next(e)
      }

   }


}