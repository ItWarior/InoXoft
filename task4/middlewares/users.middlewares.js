const path = require('path');
const { Users } = require('../dbs');
const OwnError = require(path.join(__dirname, '../', 'errors', 'errorHendler.js'));
const { is_there_same_email } = require('../services/service.users');

module.exports = {

   is_user_by_email: async (req, res, next) => {

      try {

         const { email } = req.params;
         const new_info = req.body;

         const user_by_email = await is_there_same_email(email);

         req.user = user_by_email;
         req.new_info = new_info;

         next();


      } catch (e) {

         next(e);

      }

   },
   is_user_before_register: async (req, res, next) => {

      try {

         const { email } = req.body;

         const user_by_email = await is_there_same_email(email);
      
         req.user = user_by_email;

         next();


      } catch (e) {

         next(e);

      }

   },

   is_user_by_id: async (req, res, next) => {
      try {
         const { user_id } = req.params;

         const user = await Users.findById(user_id);

         if (!user) {

            throw new OwnError(400, 'User is not found')
         }
         req.user = user;

         next();

      } catch (e) {

         next(e)
      }

   }

}
