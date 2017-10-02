const express = require('express');
const router = express.Router();

const axios = require('axios');
const API = 'https://jsonplaceholder.typicode.com';
const User = require('../../app/models/user');

router.get('/', (req, res) => {
  res.send('api works');
});

router.route('/users')
  .post(function(req, res) {
    const user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({message: 'USER MADE!'});
    });
  })
  .get(function(req, res) {
    User.find(function(err, users) {
      if (err) res.send(err);
      console.log(users);
      res.json(users);
    });
  });

router.route('/users/:user_id')
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      err ? res.send(err) : res.json(user)
    })
  })
  .put(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      user.password = req.body.password;

      user.save(function(err) {
        err ? res.send(err) : res.json({ message: 'User updated!' })
      })
    })
  });

router.get('/posts', (req, res) => {
  axios.get(`${API}/posts`)
    .then(posts => {
      res.status(200).json(posts.data);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

module.exports = router;
