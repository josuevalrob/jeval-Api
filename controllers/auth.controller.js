const User = require('../models/user.model');
const Efl = require('../models/efl.model');
const Emotions = require('../models/emotions.model');
const Strategies = require('../models/strategies.model');
const createError = require('http-errors');
const passport = require('passport');



module.exports.register = (req, res, next) => {
  const { email } = req.body;
  req.body.teacher = req.user.id; //Teacher
  User.findOne({ email: email })
    .then(async user => {
      if (user) {
        throw createError(409, {message:'Email already registered'})
      } else {
        const student = await new User(req.body).save()
        const aditionalData = {
          studentowner: student._id,
          teacher: student.teacher
        }
        const [eflProfile, emoProfile, strProfile] = await Promise.all([
          new Efl(aditionalData).save(),
          new Emotions(aditionalData).save(),
          new Strategies(aditionalData).save()
        ]).then((resolve) => resolve.map(data=>data._id))

        return Object.assign({}, student._doc, {eflProfile, emoProfile, strProfile});
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('auth-local', (error, user, message) => {
    if (error) {
      next(error);
    } else if (!user) {
      next(createError(401, message));
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error)
        } else {
          res.status(201).json(user);
        }
      })
    }
  })(req, res, next);
}

module.exports.update = (req, res, next) => {
  delete req.body.email; //never update the mail. 
  const user = req.user;
  Object.assign(user, req.body); //<-
  if (req.file) user.avatarURL = req.file.secure_url;
  user.save()
    .then(user => res.status(201).json(user))
    .catch(error => {
      next(error);
    });
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204).json();
}
