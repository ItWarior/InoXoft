const { Schema, model } = require('mongoose');

const { DBS_TABLES_ENAM } = require('../configs');

const carSchema = new Schema({
    model: {
        type: String,
        require: true,
        trim: true
    },
    power: {
        type: Number,
        require: true,
        trim: true
    },
    was_used: {
        type: Boolean,
        require: true,
        trim: true
    },
    vin_code: {
        type: String,
        trim: true,
        unique: true
    },
    [DBS_TABLES_ENAM.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: DBS_TABLES_ENAM.USER
    }

}, { timestamps: true });

module.exports = model(DBS_TABLES_ENAM.CAR, carSchema);
