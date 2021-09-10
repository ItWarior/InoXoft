const router = require('express').Router();

const { carsController } = require('../controllers');
const { CARS_MIDLEWARES } = require('../middlewares');

router.get(
    '/',
    carsController.get_all_cars
);
router.get(
    '/find/:car_id',
    CARS_MIDLEWARES.is_car_by_dynemic_params('car_id', 'params', '_id'),
    carsController.get_car_by_code
);
router.post(
    '/create',
    CARS_MIDLEWARES.is_valid_car,
    CARS_MIDLEWARES.is_car_by_dynemic_params('vin_code', 'body'),
    carsController.add_new_car
);
router.delete(
    '/drop/:car_id',
    CARS_MIDLEWARES.is_car_by_dynemic_params('car_id', 'params', '_id'),
    carsController.drop_car
);
router.put('/update/:vin_code',
    CARS_MIDLEWARES.is_valid_car,
    CARS_MIDLEWARES.is_car_by_dynemic_params('vin_code', 'params'),
    carsController.update_car);

module.exports = router;
