const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  owner: { // ? multiple teachers per session
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: [String], //it could be multiple students.  
    required: true
  },
  name:{
    type:String,
    required: [true, 'give me your name, at least 3 letters'],
    minlength: 3
  },
  cognitive: { 
    //* first value for before and second value for after recording.
    startingConversation: [Boolean], 
    myOpinion: [Boolean],
    asking: [Boolean],
    partnerGesture: [Boolean],
    comments: [Boolean],
    listeningPartnerIdeas: [Boolean],
    answering: [Boolean],
    smiling: [Boolean],
    eyeContact: [Boolean],
    bodyLanguage: [Boolean],
  },
  socioAffective : {
    feel: {
      type: String, 
      enum: ['confident', 'lost', 'nervous', 'nothing'],
      // required: true,
    }, 
    help: Boolean
  },
  future: {
    startingConversation: Boolean, //! I should find the way to re-use this keys.  
    myOpinion: Boolean,
    asking: Boolean,
    partnerGesture: Boolean,
    comments: Boolean,
    listeningPartnerIdeas: Boolean,
    answering: Boolean,
    smiling: Boolean,
    eyeContact: Boolean,
    bodyLanguage: Boolean,
  }
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

const Recording = mongoose.model('Recording', recordingSchema);
module.exports = Recording;