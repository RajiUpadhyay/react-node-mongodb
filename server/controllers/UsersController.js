const usersService = require('../services/UsersService');

exports.createUser = (req, res) => {
  let createUser = usersService.createUser(req.body);
  createUser.then(user => res.send(user));
}

exports.login = (req, res) => {
  let login = usersService.login({email, password} = req.body);
  login.then(user => res.send(user));
}

exports.currentUser = (req, res) => {
  let activeUser = usersService.currentUser({email} = req.query);
  activeUser.then(user => res.send(user));
}

exports.changePassword = (req, res) => {
  let changePassword = usersService.changePassword(req.body);
  changePassword.then(user => res.send(user));
}

exports.createAddress = (req, res) => {
  let createAddress = usersService.createAddress(req.body);
  createAddress.then(address => res.send(address));
}
