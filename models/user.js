const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt')

const userSchema = Schema({
    username: {
        required: [true, "Username is required "],
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required "],
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: []
    },
    wishlist: {
        type: Array,
        default: []
    },
    otp: {
        type: Number,
        default: null
    },
    isAdmin: { type: Boolean, default: false },
}, { timestamps: true });



userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});



module.exports = userModel = mongoose.model('user', userSchema);