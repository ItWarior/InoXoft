const router = require('express').Router();

const { carsController } = require('../controllers');
const carsMiddlewares = require('../middlewares/cars.middlewares');

router.get(
    '/',
    carsController.get_all_cars
);
router.get(
    '/find/:vin_code',
    carsMiddlewares.is_car_by_dynemic_params('vin_code', 'params'),
    carsController.get_car_by_code
);
router.post(
    '/create',
    carsMiddlewares.is_valid_car,
    carsMiddlewares.is_car_by_dynemic_params('vin_code', 'body'),
    carsController.add_new_car
);
router.delete(
    '/drop/:vin_code',
    carsMiddlewares.is_car_by_dynemic_params('vin_code', 'params'),
    carsController.drop_car
);
router.put('/update/:vin_code',
    carsMiddlewares.is_valid_car,
    carsMiddlewares.is_car_by_dynemic_params('vin_code', 'params'),
    carsController.update_car);

module.exports = router;
