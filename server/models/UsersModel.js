const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
const REQUIRED_PASSWORD_LENGTH = 8;

const validateStringLength = value => value && value.length >= REQUIRED_PASSWORD_LENGTH;

let UserSchema = new Schema({
    user_name: { type: String, required: true },
    password: { type: String, select: false, required: true },
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
        index: { unique: true }
    },
    created_at: Date,
    updated_at: Date,
    phone: Number
});

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('Users', UserSchema);