const bcrypt = require('bcrypt');

const { Users } = require('../dbs');
const OwnError = require('../errors/errorHendler');

async function is_there_same_email(key, value) {
    const user = await Users.findOne({ [key]: value });

    return user;
}

function hash(password) {
    const hash_pasword = bcrypt.hash(password, 10);

    return hash_pasword;
}
async function compare(password, hesh_password) {
    const is_password_matched = await bcrypt.compare(password, hesh_password);

    if (!is_password_matched) {
        throw new OwnError(400, 'Email or password is wrong');
    }
}

module.exports = {

    is_there_same_email,
    hash,
    compare

};
