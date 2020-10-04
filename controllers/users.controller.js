const User = require('../models/user.model');
const createError = require('http-errors');
const Efl = require('../models/efl.model');
const Emotions = require('../models/emotions.model');
const Strategies = require('../models/strategies.model');

module.exports.update = (req, res, next) => {
  const id = req.params.id
  User.findById(id)
    .then(user => {
      if (user) {
        Object.assign(user, req.body);
        user.save()
          .then(user => res.status(201).json(user))
          .catch(createError(502, 'Mongoose error'))
      } else {
        next(createError(404, 'User not found'))
      }
    })
    .catch(next)

}

module.exports.all = (req, res, next) => {
  User.find({teacher:req.user.id})
    .then(User => {
      if(User.length){
        res.status(200).json(User)
      } else {
        res.status(404).json({message:'No User created.'})
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
//? it could be better for the performance if i divide this response.
  User.findById(req.params.id)
    // .populate('owner')  //? current user
    .then(User => {
      res.status(201).json(User)
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  //! here we should delete also the User from message folder. 
  //* maybe a promise all with fs.unlink with all the message from the current User
  User.findOneAndDelete({_id : req.params.id, teacher: req.user.id})
    .then(async User => {
      if (!User) {
        throw createError(404, 'User not found')
      }

      await Efl.findOneAndDelete({studentOwner:req.params.id});
      await Emotions.findOneAndDelete({studentOwner:req.params.id});
      await Strategies.findOneAndDelete({studentOwner:req.params.id});

      return res.status(204).send()
    })
    .catch(next)
}