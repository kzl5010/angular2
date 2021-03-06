const express = require('express');
const router = express.Router();
const { noAuth } = require('../middleware/auth.js');
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');
const API = 'https://jsonplaceholder.typicode.com';
const User = require('../../app/models/user');

module.exports = (passport) => {
  router.get('/', (req, res) => {
    res.send('api works');
  });

  router.post('/login', [noAuth, passport.authenticate('login-local')], (req, res) => res.send(req.user));

  router.get('/logout', (req, res) => {
    req.logout();
    res.send();
  });

  router.post('/register', noAuth, (req, res) => {
    const user = new User();
    user.email = req.body.email;
    user.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // user.password = req.body.password;
    user.save((err) => {
      if (err) {
        res.send(err);
      }
      res.json({message: 'USER MADE!'});
    });
  });

  router.route('/users')
    .post((req, res) => {
      const user = new User();
      user.email = req.body.email;
      user.password = req.body.password;
      user.save((err) => {
        if (err) {
          res.send(err);
        }
        res.json({message: 'USER MADE!'});
      });
    })
    .get((req, res) => {
      User.find((err, users) => {
        if (err) res.send(err);
        console.log(users);
        res.json(users);
      });
    });

  router.route('/users/:user_id')
    .get((req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        err ? res.send(err) : res.json(user);
      });
    })
    .put((req, res) => {
      User.findById(req.params.user_id, (err, user) => {
        if (err) res.send(err);
        user.password = req.body.password;

        user.save(function (err) {
          err ? res.send(err) : res.json({message: 'User updated!'});
        });
      });
    })
    .delete((req, res) => {
      User.remove({
        _id: req.params.user_id,
      }, (err) => {
        err ? res.send(err) : res.json({message: 'User deleted!'});
      });
    });

  router.get('/posts', (req, res) => {
    axios.get(`${API}/posts`)
      .then(posts => res.status(200).json(posts.data))
      .catch(error => res.status(500).send(error));
  });
  return router;
};

