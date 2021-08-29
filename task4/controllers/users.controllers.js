const path = require('path');

const {
   get_users_from_dbs,
   is_valid_user,
   add_user_to_dbs,
   delete_user_in_dbs
} = require(path.join(__dirname, '../', 'services', 'service.users.js'));

module.exports = {

   get_all_users: async (req, res, next) => {

      try {
         const users = await get_users_from_dbs();

         res.json(users);

      } catch (e) {

         next(e);

      }
   },

   get_user_by_id: async (req, res, next) => {
      try {

         const { user_id } = req.params;
         const users = await get_users_from_dbs();

         res.json(users[user_id]);

      } catch (e) {

         next(e);

      }
   },
   add_new_user: async (req, res, next) => {

      try {

         const newUser = (req.body);

         const valid = await is_valid_user(newUser.email, newUser.password);

         if (valid) {

            res.end('There is the same user');
            return

         }
         await add_user_to_dbs(newUser);

         res.end("congratulations you have successfully registered");

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







