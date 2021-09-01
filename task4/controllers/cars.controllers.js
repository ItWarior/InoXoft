const { Cars } = require('../dbs');

module.exports = {

   get_all_cars: async (req, res, next) => {

      try {

         res.json(await Cars.find({}));

      } catch (e) {

         next(e);

      }

   },
   get_car_by_code: async (req, res, next) => {

      try {

         const vin_code = req.params;

         const find_car = await Cars.findOne(vin_code);

         res.json(find_car);
      } catch (e) {

         next(e);

      }

   },
   add_new_car: async (req, res, next) => {

      try {

         const new_car = await Cars.create(req.body);

         res.json(new_car);
      } catch (e) {

         next(e);

      }

   },
   drop_car: async (req, res, next) => {

      try {

         const car = await Cars.deleteOne(req.params);

         res.json(`You delete ${car.deletedCount} car`);

      } catch (e) {

         next(e);

      }


   },
   update_car: async (res, req, next) => {

      try {

         const update_car = await Cars.updateOne(res.car, res.update_to_car);

         req.json(update_car);

      } catch (e) {

         next(e);

      }

   }

}