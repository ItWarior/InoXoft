const router = require('express').Router();
const path = require('path');

const { getUsers, addUser, validUser, deleteUser } = require(path.join(__dirname, '../', 'controllers', 'users.controllers.js'));

router.get('/', async (req, res) => {
   const users = await getUsers();

   res.json(users);
})

router.get('/:user_id', async (req, res) => {
   const users = await getUsers();
   const { user_id } = req.params;

   res.json(users[user_id]);
})

router.post('/register', async (req, res) => {
   const newUser = (req.body);

   const valid = await validUser(newUser.email, newUser.password);

   if (valid) {

      res.end('There is the same user');
      return

   }
   await addUser(newUser);

   res.end("congratulations you have successfully registered");
})

router.delete('/delete/:email', async (req, res) => {
   const { email } = req.params;

   const status = await deleteUser(email);

   if (typeof (status) === "object") {

      res.json(status);
      return
   }

   res.end(starus);
})

module.exports = router;