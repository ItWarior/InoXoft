const path = require('path');
const { Users } = require('../dbs');


const OwnError = require(path.join(__dirname, '../', 'errors', 'errorHendler.js'));
const { is_there_same_email } = require('../services/user.service');
const user_validator = require('../validators/user.validator');

module.exports = {

   is_user_by_body: async (req, res, next) => {

      try {

         const new_user = req.body;

         const user_by_email = await is_there_same_email(new_user.email);

         req.user = user_by_email;
         req.new_info = new_user;

         next();


      } catch (e) {

         next(e);

      }

   },
   is_user_by_email: async (req, res, next) => {
      try {
         const email = req.params;

         const user = await Users.findOne(email).select('+password');

         if (!user) {

            throw new OwnError(400, 'User is not found')
         }
         req.user = user;

         next();

      } catch (e) {

         next(e)
      }

   },
   is_valid_user: (req, res, next) => {

      try {
         const { error, value } = user_validator.create_user_validator.validate(req.body);

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
