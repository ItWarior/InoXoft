const fs = require('fs/promises');
const path = require('path');

const WAY_TO_FILE_USERS = path.join(__dirname, '../', 'dbs', 'dbusers.json');

async function getUsers() {
   const users = await fs.readFile(WAY_TO_FILE_USERS);
   const parse_users = (!users.toString()) ? [] : JSON.parse(users);

   return parse_users;
}

async function overwriteUsers(users) {
   await fs.writeFile(WAY_TO_FILE_USERS, JSON.stringify(users));
}

async function addUser(user) {
   const users = await getUsers();

   users.push(user);
   await fs.writeFile(WAY_TO_FILE_USERS, JSON.stringify(users));

}

async function validUser(email, password) {
   const users = await getUsers();

   let valid = false;

   if (users.length > 0) {
      users.forEach(user => {
         if (user.email === email && user.password === password) {
            valid = true;
         }
      });
   }

   return valid
}

async function deleteUser(email) {
   const users = await getUsers();

   let status = "There is not the same user";

   for (let i = 0; i < users.length; i++) {

      if (users[i].email === email) {

         status = users.splice(i, 1);
         overwriteUsers(users);

         return status;
      }
   }
   return status;
}

module.exports = {
   getUsers, addUser, validUser, deleteUser
}