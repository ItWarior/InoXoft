const { Users } = require('../dbs');

async function is_there_same_email(value) {

      const user = await Users.findOne({ email: value.trim() });

      return user;

}

module.exports = {

      is_there_same_email

}