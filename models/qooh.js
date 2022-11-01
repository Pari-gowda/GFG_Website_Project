const mongoose = require('mongoose');

const qoohSchema = new mongoose.Schema({
    qooh: {
        type: String,
        required: true,
    },
});

module.exports = new mongoose.model("qooh", qoohSchema);