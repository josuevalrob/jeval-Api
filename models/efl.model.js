const mongoose = require('mongoose');

const eflSchema = new mongoose.Schema({
  studentowner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: {
    age: { type: String, default: 0},
    gender: { type: String, enum : ['female','male']},
    tongue: { type: String, default: ''},
    studyHours: { type: String, enum : ['1-2 hours', '3-4 hours', 'More than 4 hours']},
    why: {
      interested: { type: Boolean, default: false, },
      curriculum: { type: Boolean, default: false, },
      culture: { type: Boolean, default: false, },
      friends: { type: Boolean, default: false, },
      career: { type: Boolean, default: false, },
      travel: { type: Boolean, default: false, },
      study: { type: Boolean, default: false, },
      work: { type: Boolean, default: false, },
      other: { type: Boolean, default: false, },
    },
    why_other:  { type: String, default: ''},
    otherTongue: { type: String, default: ''},
    opinionLearningOtherLanguage: { type: String, enum : ['Very Important', 'Important', 'No so important']},
  },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret
      }
    }
  })


const EflProfile = mongoose.model('EflProfile', eflSchema);
module.exports = EflProfile;