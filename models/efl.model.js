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
    gender: { type: String, enum : ['female','male'], default: 'male'},
    tongue: { type: String, default: ''},
    studyHours: { type: String, enum : ['1-2 hours', '3-4 hours', 'More than 4 hours'], default: '1-2 hours'},
    why: { type: String, default: ''},
    otherTongue: [{ type: String, default: ''}],
    opinionLearningOtherLanguage: { type: String, enum : ['Very Important', 'Important', 'No so important'], default:'Important'},
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