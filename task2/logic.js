const fs = require('fs/promises');
const path = require('path');

const WAY_TO_FILE_USERS = path.join(__dirname, 'dbusers.json');

async function getUsers() {
   const users = await fs.readFile(WAY_TO_FILE_USERS);
   const parse_users = (!users.toString()) ? [] : JSON.parse(users);

   return parse_users;
}

async function addUser(users) {
   await fs.writeFile(WAY_TO_FILE_USERS, JSON.stringify(users));
}

module.exports = {
   getUsers: getUsers,
   addUser: addUser
}