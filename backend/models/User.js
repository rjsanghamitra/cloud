const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 3,
            max: 20,
        },
        lastName: {
            type: String,   
            max: 20,
        },
        email: {
            type: String,
            required: true,
            max: 20,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 8,
        },
        picture: {
            type: String,
            default: Buffer.alloc(0),
        },
        friends: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
    }, { timestamps: true });       // automatically adds created at and updated at timestamps

const User = mongoose.model("User", UserSchema);
module.exports = User;