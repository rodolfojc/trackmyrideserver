const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// User Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// Hashing and Salt before the user is saved in database (method - pre)
// function as "Function to use (this) keyword pointing the current user object"
userSchema.pre('save', function(next) {
    const user = this;

    // Check is the password is not modified
    if (!user.isModified('password')) {
        return next();
    }

    // Generating a Salt with complexity 10 (characters)
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        // Hashing user password + salt (generated)
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            // Asigning the hast password to current user
            user.password = hash;
            next();
        });
    });
});

// Adding a method to compare hashed password with user password input
userSchema.methods.comparePassword = function (userPasswordInput) {
    const user = this;

    return new Promise((resolve, reject) => {
        // Comparing password with bycryp build in method
        bcrypt.compare(userPasswordInput, user.password, (err, isMatch) => {
            // Any error = rejected
            if (err) {
                return reject(err);
            }
            // No match = rejected false
            if (!isMatch) {
                return reject(false);
            }

            // Resolve with True
            resolve(true);
        });
    });
};

mongoose.model('Users', userSchema);