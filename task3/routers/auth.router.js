const router = require('express').Router();
const { join } = require('path');
const path = require('path');

const { validUser } = require(path.join(__dirname, '../', 'controllers', 'users.controllers.js'));

router.post('/', async (req, res) => {

   const { email, password } = req.body;

   const valid = await validUser(email, password);

   if (valid) {

      res.writeHead(200, {
         'Content-Type': 'text/plane'
      }).end(valid.toString());
      return
   }
   res.end("User not exist")
})

module.exports = router;