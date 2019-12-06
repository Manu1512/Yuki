const { Schema, model } = require('mongoose');

const langSchema = Schema({
    guildId: Number,
    lang: String,
});

module.exports = model('Lang', langSchema);
