const path = require('path');
const { Users } = require('../dbs');
const OwnError = require(path.join(__dirname, '../', 'errors', 'errorHendler.js'));

module.exports = {

   is_user_exist: async (req, res, next) => {

      try {

         const { email } = req.body;

         const user_by_email = await Users.findOne({ email: email.trim() });

         if (user_by_email) {

            throw new OwnError(409, 'Email is alredy exist')

         }
         next();
      } catch (e) {

         next(e);

      }

   },

   is_user_by_id: async (req, res, next) => {
      try {
         const { user_id } = req.params;

         const user = await Users.findById(user_id);
         console.log(user);
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
