// const User = require('../models/user.model'); //? I got the user from passport.
const Recording = require('../models/recording.model');
const createError = require('http-errors');
const passport = require('passport');


module.exports.create = (req, res, next) => {
  req.body.owner = req.user.id
  new Recording(req.body)
    .save()
    .then(recording => {
      res.status(201).json(recording)
    })
    .catch(next)
}

module.exports.all = (req, res, next) => {
  Recording.find()
    .then(recording => {
      if(recording.length){
        const preview = {id: recording.id, name: recording.name}
        res.status(200).json(preview)
      } else {
        res.status(404).json({message:'No recording created.'})
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
//? it could be better for the performance if i divide this response. 
  Recording.findById(req.params.id)
    // .populate('owner')  //? current user
    .then(recording => {
      res.status(201).json(recording)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  const id = req.params.id
  req.body.owner = req.user.id
  Recording.findOneAndUpdate(
    {_id: id}, 
    req.body, 
    { new: true, runValidators: true, useFindAndModify: false })
    .then(recording => {
      if (recording) {
        res.status(201).json(recording)
      } else {
        next(createError(404, 'recording not found'))
      } 
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  ClassRoom.findOneAndDelete({_id : req.params.id, owner: req.user.id})
    .then(recording => {
      if (!recording) {
        throw createError(404, 'Class room not found')
      }
      res.status(204).send()
    })
    .catch(next)
}