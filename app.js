require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const passport = require('passport');
const bodyParser = require('body-parser');

// configs
require('./configs/db.config');
require('./configs/passport.config');
const session = require('./configs/session.config')
const cors = require('./configs/cors.config')

// routers
const authRouter = require('./routes/auth.routes');
const recordRouter = require('./routes/recording.routes');
// initializing express...
const app = express();
// middlewares
const secure = require('./middlewares/secure.mid');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(logger('dev'));
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// authentication middlewares
app.use(cors)
app.use(session)
app.use(passport.initialize())
app.use(passport.session())
app.get('/', function (req, res) {
  res.send('Service Workin 🔥🔥!');
});
app.use('/', authRouter);
app.use('/recording', secure.isAuthenticated, recordRouter)


//* Handling errors
app.use((req, res, next) => {
  next(createError(404, 'not found 🤷‍♂️'))
})

app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.status || 500);
  const data = {};

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);
    data.errors = {}
    Object.keys(error.errors)
      .forEach(field => data.errors[field] = error.errors[field].message)
  } else if (error instanceof mongoose.Error.CastError) {
    res.status(404);
    error.message = 'Resource not found';
  }

  data.message = error.message
  res.json(data);
})

module.exports = app;
