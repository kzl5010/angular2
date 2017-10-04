const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const MONGODBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HelloMongoose';
mongoose.connect(MONGODBURI);
console.log(MONGODBURI);

const api = require('./server/routes/api');
const User = require('./app/models/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
