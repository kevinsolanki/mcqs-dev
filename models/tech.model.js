const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const techSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true, versionKey: false})

module.exports = model("tech", techSchema);