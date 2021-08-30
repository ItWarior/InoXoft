const path = require('path');

const OwnError = require(path.join(__dirname, '../', 'errors', 'errorHendler.js'));
const { Users } = require('../dbs');

const {
   get_users_from_dbs,
   is_valid_user,
   add_user_to_dbs,
   delete_user_in_dbs
} = require(path.join(__dirname, '../', 'services', 'service.users.js'));

module.exports = {

   get_all_users: async (req, res, next) => {

      res.json(Users)

   },

   get_user_by_id: async (req, res, next) => {
      try {

         res.json(req.user);

      } catch (e) {

         next(e);

      }
   },
   add_new_user: async (req, res, next) => {

      try {

         const user = await Users.create(req.body);

         res.json(user);

      } catch (e) {

         next(e);

      }

   },
   delete_user_by_id: async (req, res, next) => {

      try {

         const { email } = req.params;
         const status = await delete_user_in_dbs(email);

         if (typeof (status) === "object") {

            res.json(status);
            return
         }
         throw new Error(status)

      } catch (e) {

         next(e);

      }

   }

}







