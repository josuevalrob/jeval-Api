const Efl = require('../models/efl.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const id = req.params.id; //student
  Efl.findOneAndUpdate(
    {studentowner: id},
    { $set: {'questions': req.body} },
    { new: true, upsert: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(eflProfile => {
      if (eflProfile) {
        res.status(201).json(Object.assign({}, eflProfile._doc, {labels}))
      } else {
        next(createError(404, 'Efl not found'))
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
  const studentowner = req.params.id; //student
  Efl.findOne({studentowner})
    .populate('studentowner')
    .populate('teacher')
    .then(({_doc}) => {
      res.status(201).json(Object.assign({}, _doc, {labels}))
    })
    .catch(next)
}

const labels = [
  {
    label: 'How old are you',
    key: 'age',
  },
  {
    label: 'What is your gender',
    key: 'gender',
    options: ['female', 'male'],
  },
  {
    label: 'Which is your mother tongue?',
    key: 'tongue',
  },
  {
    label: 'How many hours do you devote to studying English apart from the English classes?',
    key: 'studyHours',
    options: ['1-2 hours', '3-4 hours', 'More than 4 hours']
  },
  {
    label: 'Why do you study English',
    key: 'why',
    options: [
      'I am interested in English.',
      'It is in the curriculum',
      'I want to learn its culture.',
      'I have friends who speak English.',
      'I need it for my career.',
      'I need it to travel.',
      'I want to study abroad.',
      'I will ned it to work',
    ]
  },
  {
    label: 'Do you speak any other language (different from Spanish and English)',
    key: 'otherTongue',
  },
  {
    label: 'In your opinion learning a foreign language is:',
    key: 'opinionLearningOtherLanguage',
    options: ['Very Important', 'Important', 'No so important']
  },
]