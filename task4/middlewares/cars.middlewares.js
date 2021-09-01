const { Cars } = require('../dbs');
const OwnError = require('../errors/errorHendler.js');

module.exports = {

   is_car_exist: async (req, res, next) => {

      try {
         console.log(req);
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

   }


}