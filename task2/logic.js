const fs = require('fs/promises');
const path = require('path');

const way_to_file_users = path.join(__dirname, 'static', 'dbusers.json');

async function getUsers() {
   const users = await fs.readFile(way_to_file_users);  
   const parse_users = (!users.toString()) ? [] : JSON.parse(users);

   return parse_users;
}

async function addUser(users) {
   await fs.writeFile(way_to_file_users, JSON.stringify(users));
}

module.exports = {
   getUsers: getUsers,
   addUser: addUser
}