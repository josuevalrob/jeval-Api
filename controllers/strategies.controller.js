const Strategies = require('../models/strategies.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const studentowner = req.params.id; //student
  const stage = req.params.stg; //student
  Strategies.findOneAndUpdate(
    {studentowner, stage},
    req.body,
    { new: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(Strategies => {
      if (Strategies) {
        res.status(201).json(Strategies)
      } else {
        next(createError(404, 'Strategies not found'))
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
  const studentowner = req.params.id; //student
  const stage = req.params.stg; //student
  Strategies.find({studentowner, stage})
    .populate('studentowner')
    .populate('teacher')
    .then(Strategies => {
      // * we have to merge with the labels
      res.status(201).json(Strategies)
    })
    .catch(next)
}
