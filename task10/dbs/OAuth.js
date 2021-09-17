const { Schema, model } = require('mongoose');

const { DBS_TABLES_ENAM } = require('../configs');

const OAuth_shema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [DBS_TABLES_ENAM.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: DBS_TABLES_ENAM.USER
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

OAuth_shema.pre('findOne', function() {
    this.populate(DBS_TABLES_ENAM.USER);
});

module.exports = model(DBS_TABLES_ENAM.OAUTH, OAuth_shema);
