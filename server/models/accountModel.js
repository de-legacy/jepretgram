const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;