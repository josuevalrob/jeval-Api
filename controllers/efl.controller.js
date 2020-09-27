const Efl = require('../models/efl.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const id = req.params.id; //student
  Efl.findOneAndUpdate(
    {studentowner: id},
    req.body,
    { new: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(eflProfile => {
      console.log(eflProfile)
      if (eflProfile) {
        res.status(201).json(eflProfile)
      } else {
        next(createError(404, 'Efl not found'))
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
  const studentowner = req.params.id; //student
  Efl.find({studentowner})
    .populate('studentowner')
    .populate('teacher')
    .then(eflProfile => {
      res.status(201).json(eflProfile)
    })
    .catch(next)
}
