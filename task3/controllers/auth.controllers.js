const path = require('path');

const {
   get_users_from_dbs,
   is_valid_user,
   add_user_to_dbs,
   delete_user_in_dbs
} = require(path.join(__dirname, '../', 'services', 'service.users.js'));

module.exports = {
   auth: async (req, res, next) => {
      try {

         const { email, password } = req.body;

         const valid = await is_valid_user(email, password);

         if (valid) {

            res.writeHead(200, {
               'Content-Type': 'text/plane'
            }).end(valid.toString());
            return
         }
         
         res.json("User not exist")

      } catch (e) {

         next(e);

      }

   }
}
