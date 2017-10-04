const express = require('express');
const path = require('path');
const http = require('http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const app = express();

const MONGODBURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HelloMongoose';
mongoose.connect(MONGODBURI);
console.log(MONGODBURI);

exports.mongoose = mongoose;

const api = require('./server/routes/api');
const User = require('./app/models/user');

//use passport initialize file in server
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'hesbeginningtobelieve' }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', api);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
