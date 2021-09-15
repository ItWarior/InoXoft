const { Schema, model } = require('mongoose');

const { USER_ROLES, DBS_TABLES_ENAM } = require('../configs');

const userSchema = new Schema({

    name: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        select: false
    },
    born_year: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    role: {
        type: String,
        default: USER_ROLES.USER,
        enum: Object.values(USER_ROLES)
    }

}, { timestamps: true });

module.exports = model(DBS_TABLES_ENAM.USER, userSchema);
