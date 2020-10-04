const Emotions = require('../models/emotions.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const id = req.params.id; //student
  Emotions.findOneAndUpdate(
    {studentowner: id},
    { $set: {'questions': req.body} },
    { new: true, upsert: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(Emotions => {
      if (Emotions) {
        res.status(201).json(Object.assign({}, Emotions._doc, {labels}))
      } else {
        next(createError(404, 'Emotions not found'))
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
  const studentowner = req.params.id; //student
  Emotions.findOne({studentowner})
    .populate('studentowner')
    .populate('teacher')
    .then(({_doc}) => {
      res.status(201).json(Object.assign({}, _doc, {labels}))
    })
    .catch(next)
}


const labels = [
  {
    key:'kind',
    label: 'What kind of emotions would you experiencein this situation? Circle the appropiate letter',
    options: ['Positive: excitment, happiness','Negative: frustration, anger', 'Neutral: That would not affect me at all']
  },
  {
    key:'emotions',
    label: 'Choose the emotions (one or more) you would feel in Scenario 1.',
    options: [
      'kind',
      'anxious',
      'ashamed',
      'awkward',
      'confused',
      'brave',
      'calm',
      'capable',
      'confident',
      'courageous',
      'curios',
      'eager',
      'envious',
      'enthusiastic',
      'frustrated',
      'uncomfortable',
      'vulnerable',
      'threatened',
      'timid',
    ],
  },
  {
    key:'positiveManagement',
    label:'What would you do to manage any positive emotions in Scenario 1?'
  },
  {
    key:'negativeManagement',
    label:'What would you do to manage any negative emotions inScenario 1'
  },
  {
    key:'management',
    label: 'If you tried to manage your emotions in the situation, explain HOW did you do so?. (maximum 30 words)'
  }


]