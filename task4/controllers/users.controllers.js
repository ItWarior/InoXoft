const path = require('path');

const OwnError = require(path.join(__dirname, '../', 'errors', 'errorHendler.js'));
const { Users } = require('../dbs');

const { is_there_same_email } = require(path.join(__dirname, '../', 'services', 'service.users.js'));

module.exports = {

   get_all_users: async (req, res, next) => {

      try {

         res.json(await Users.find({}));

      } catch (e) {

         next(e);
      }

   },

   get_user_by_id: (req, res, next) => {
      try {

         res.json(req.user);

      } catch (e) {

         next(e);

      }
   },
   add_new_user: async (req, res, next) => {

      try {
         const user = req.user;

         if (user) {

            throw new OwnError(409, 'There is the same user')

         }
         const new_user = await Users.create(req.body);

         res.json(new_user);

      } catch (e) {

         next(e);

      }

   },
   update_exist_user: async (req, res, next) => {
      try {
         const user = req.user;
         const new_info = req.new_info;

         const valid = await is_there_same_email(new_info.email);

         if (user && new_info && !valid) {

            const update_user = await Users.updateOne(user, new_info);
            res.json(update_user);
            return
         }

         throw new OwnError(404, "Data is not valid")

      } catch (e) {

         next(e);

      }

   },
   delete_user_by_id: async (req, res, next) => {

      try {
         const user = req.user;
      
         if (!user) {

            throw new OwnError(404, 'User is not faund')

         }

         const delete_user = await Users.deleteOne({ email: user.email });

         res.json(`You delete ${delete_user.deletedCount} user`);

      } catch (e) {

         next(e);

      }

   }

}







