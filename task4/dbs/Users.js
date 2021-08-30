const { Schema, model } = require('mongoose');
const path = require('path');

const USER_ROLES = require(path.join(__dirname, '../', 'configs', 'user-roles.enam.js'));

const userSchema = new Schema({

   name: {
      type: String,
      require: true,
      trim: true
   },
   email: {
      type: String,
      require: true,
      unique: true
   },
   role: {
      type: String,
      default: USER_ROLES.USER,
      enum: Object.values(USER_ROLES)
   }

}, { timestamps: true });

module.exports = model('user', userSchema);