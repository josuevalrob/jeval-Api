const mongoose = require('mongoose');

const emotionSchema = new mongoose.Schema({
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
  scenario: {
    type: String,
    default: "You and your partner have to talk in English AND your teacher will check what you are saying."
  },
  questions: {
    kind: { type: String, enum : ['Positive: excitment, happiness','Negative: frustration, anger', 'Neutral: That would not affect me at all'],  },
    emotions: {
      anxious: { type: Boolean, default: false, },
      ashamed: { type: Boolean, default: false, },
      awkward: { type: Boolean, default: false, },
      confused: { type: Boolean, default: false, },
      brave: { type: Boolean, default: false, },
      calm: { type: Boolean, default: false, },
      capable: { type: Boolean, default: false, },
      confident: { type: Boolean, default: false, },
      courageous: { type: Boolean, default: false, },
      curios: { type: Boolean, default: false, },
      eager: { type: Boolean, default: false, },
      envious: { type: Boolean, default: false, },
      enthusiastic: { type: Boolean, default: false, },
      frustrated: { type: Boolean, default: false, },
      uncomfortable: { type: Boolean, default: false, },
      vulnerable: { type: Boolean, default: false, },
      threatened: { type: Boolean, default: false, },
      timid: { type: Boolean, default: false, },
    },
    positiveManagement:{type: String, maxlength: 600},
    negativeManagement:{type: String, maxlength: 600},
    management:{type:String, maxlength:600}
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


const Emotions = mongoose.model('Emotions', emotionSchema);
module.exports = Emotions;