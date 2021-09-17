const { Schema, model } = require('mongoose');

const { DBS_TABLES_ENAM } = require('../configs');

const Forgot_pass_shema = new Schema({
    action_token: {
        type: String,
        require: true
    },
    [DBS_TABLES_ENAM.USER]: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: DBS_TABLES_ENAM.USER
    }

}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

Forgot_pass_shema.pre('findOne', function() {
    this.populate(DBS_TABLES_ENAM.USER);
});

module.exports = model(DBS_TABLES_ENAM.ACTION_TOKEN, Forgot_pass_shema);
