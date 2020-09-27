const Emotions = require('../models/emotions.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const id = req.params.id; //student
  Emotions.findOneAndUpdate(
    {studentowner: id},
    req.body,
    { new: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(Emotions => {
      if (Emotions) {
        res.status(201).json(Emotions)
      } else {
        next(createError(404, 'Emotions not found'))
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
  const studentowner = req.params.id; //student
  Emotions.find({studentowner})
    .populate('studentowner')
    .populate('teacher')
    .then(Emotions => {
      res.status(201).json(Emotions)
    })
    .catch(next)
}
