const accountModel = require('../models/accountModel');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');

const create = (req, res) => {

  if (typeof req.body.password !== "undefined" && req.body.password !== null) {
    const saltRounds = 10;
    let plainPassword = req.body.password;

    bcrypt.hash(plainPassword, saltRounds).then(function (hash) {
      
      let account = new accountModel({
        username: req.body.username || null,
        password: hash || null,
        email: req.body.email || null,
      })

      account.save()
        .then(newAccount => {
          res.status(200).send({ account: newAccount, message: 'Account Created' });
          
        }).catch(err => res.status(500).send({ message: 'Something wrong new Account', error: err.message }));

    }).catch(err => res.status(500).send({message: "Unauthorized"}));
  }
}

const update = (req, res) => {
  accountModel.findOne({ _id: ObjectId(req.params.accountId)}).then(account => {
    if (account) {
      // Update
      account.username = req.body.username || account.username;
      account.email = req.body.email || account.email;
      account.save()
        .then(newAccount => {
          res.status(200).send({ account: newAccount, message: 'Account Updated' });

        }).catch(err => res.status(500).send({ message: 'Something wrong new Updated', error: err.message }));

    } else {
      res.status(500).send({message: "Account not found"});
    }
    
  }).catch(err => res.status(500).send({message: err.message}));
}

const findAll = (req, res) => {
  accountModel.find({})
  .then(accounts => {
    res.status(200).send(accounts)
    
  }).catch(err => res.status(500).send({message: err.message}));
}

const destroy = (req, res) => {
  accountModel.findByIdAndRemove(ObjectId(req.params.accountId), (err, accountDeleted) => {
    if (err) {
      res.status(500).send({message: err.message});
    } else {
      res.status(200).send({
        message: 'Account deleted',
        account: accountDeleted
      });
    }
    
  })
}

const signIn = (req, res) => {
  res.status(200).send({ id: req.header._id, token: req.header.token, email: req.header.email, })
}


module.exports = {
  findAll,
  create,
  update,
  destroy,
  signIn,
}