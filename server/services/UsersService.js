const Comments = require('../models/CommentsModel');
const Users = require('../models/UsersModel');
const Address = require('../models/AddressModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.createUser = (body) => {
    return new Promise((resolve, reject) => {
        Users.findOne({email: body.email}, (err, user) => {
            if(err) return reject({error: err});
            if(!user) {
                let user = new Users;
                user.user_name = body.user_name;
                user.first_name = body.first_name;
                user.last_name = body.last_name;
                user.email = body.email;
                user.created_at = new Date();
                user.updated_at = new Date();
                user.phone = body.phone;
                user.password = body.password;        
                user.save((err, user) => {
                    if(err) return reject(err);
                    resolve({user, success: {message: 'User created successfully.'}});
                });
            } else {
                resolve({failure: {message: `User already exists with email: ${user.email}`}});
            }
        });
        
    });
}

exports.currentUser = ({email}) => {
    return new Promise((resolve, reject) => {
        Users.findOne({email}).exec((err, user) => {
            if(err) return reject({failure: err});
            if(!user) return resolve({failure: {message: `Unauthorized user!`}});
            resolve({status: true});
        });
    });
}


exports.login = ({email, password}) => {
    return new Promise((resolve, reject) => {
        Users.findOne({email}).select('+password').exec((err, user) => {
            if(err) return reject({failure: err});
            if(!user) return resolve({failure: {message: `No user found with email: ${email}!`}});

            user.comparePassword(password, function(err, isMatch) {
                if (err) return reject({error: err});
                if (!isMatch) return resolve({ failure: {message: 'Wrong password!'} });

                if (isMatch) {
                    jwt.sign({user}, 'OBAJU_NODE_REACT_MONGO', {expiresIn: '10000s'}, (err, token) => {
                        resolve({
                            user: {
                                email: user.email,
                                user_name: user.user_name,
                                first_name: user.first_name,
                                last_name: user.last_name
                            },
                            token: token,
                            success: {
                                message: 'User LoggedIn successfully.'
                            }
                        });
                    });
                }
                
            });
        });
    });
}

exports.changePassword = (body) => {
    return new Promise((resolve, reject) => {
        Users.findOne({email: body.email}).select('+password').exec((err, user) => {
            if(err) return reject({failure: err});
            if(!user) return resolve({failure: {message: `No user found with email: ${email}!`}});

            user.comparePassword(body.password_old, function(err, isMatch) {
                if (err) return reject({error: err});
                if (!isMatch) return resolve({failure: {message: `Incorrect old password for user: ${user.user_name}!`}});

                bcrypt.genSalt(10, function(err, salt) {
                    if (err) return reject(err);

                    bcrypt.hash(body.password, salt, function(err, hash) {
                        if (err) return reject(err);
                        user.password = hash;

                        Users.update({email: body.email}, user, {upsert: true, setDefaultsOnInsert: true}, (err) => {
                            if(err) return resolve({failure: {message: `Error while changing the password!`}});

                            resolve({
                                user: {first_name: user.first_name, last_name: user.last_name, email: user.email, phone: user.phone, user_name: user.user_name},
                                success: {message: 'Password updated successfully.'}
                            });
                        });
                    });
                });
            });
        });
    });
}

exports.createAddress = (body) => {
    console.log('server==>', body)
    return new Promise((resolve, reject) => {
        Address.findOne({email: body.email}, (err, address) => {
            if(err) return reject({error: err});
            if(!address) {
                let address = new Address;
                address.first_name = body.first_name.toLowerCase();
                address.last_name = body.last_name.toLowerCase();
                address.phone = body.phone;
                address.apartment = body.apartment.toLowerCase();
                address.city_name = body.city_name.toLowerCase();
                address.zip = body.zip;
                address.state_code = body.state_code.toUpperCase();
                address.country_code = body.country_code.toUpperCase();
                address.email = body.email;
                address.street = body.street.toLowerCase();
                address.save((err, address) => {
                    if(err) return reject(err);
                    resolve({address, success: {message: 'New address added successfully.'}});
                });
            } else {
                Address.update({email: body.email}, body, {upsert: true, setDefaultsOnInsert: true}, (err) => {
                    if(err) return resolve({failure: {message: `Error while updating address details!`}});
                    resolve({
                        address: address,
                        success: {message: 'Address updated successfully.'}
                    });
                });
            }
        });
        
    });
}