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
    age: { type: String },
    gender: { type: String, enum : ['female','male'],  },
    tongue: { type: String },
    studyHours: { type: String, enum : ['1-2 hours', '3-4 hours', 'More than 4 hours'], },
    why: { type: String },
    otherTongue: { type: String },
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