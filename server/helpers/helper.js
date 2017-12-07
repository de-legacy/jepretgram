const accountModel = require('../models/accountModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signIn = (req, res, next) => {
  if (typeof req.body.username !== "undefined") {
    accountModel.findOne({ username: req.body.username })
      .then(account => {
        if (account) {
          bcrypt.compare(req.body.password, account.password).then(function (result) {
            if (result) {
              let data = {
                _id: account._id,
                username: account.username,
                password: account.password,
              }

              jwt.sign(
                data, process.env.JWT_SECRET,
                (err, token) => {
                  if (err) {
                    res.status(500).send({ message: 'Wrong account' });
                  } else {
                    req.header.token = token;
                    req.header.email = account.email;
                    req.header.username = account.username;
                    req.header._id = account._id;

                    next();
                  }
                }
              );

            } else {
              res.status(500).send({ message: 'Wrong account' });
            }
          }).catch(err => res.status(500).send({ message: 'Wrong account' }));

        } else {
          res.status(500).send({message: 'Wrong account'});
        }

      }).catch(err => res.status(500).send({ message: 'Something wrong', error: err.message }));
  }

}

const isSignIn = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.JWT_SECRET, (err, decoded) => {
    if (typeof decoded !== 'undefined') {
      req.verifiedUser = decoded
      next();

    } else {
      res.status(401).send({ message: 'Login first' });
    }
  });
}

module.exports = {
  signIn,
  isSignIn,
}