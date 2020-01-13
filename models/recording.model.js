const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema({
  owner: { // ? multiple teachers per session
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  students: {
    type: [String], //it could be multiple students.  
    validate: [arrayLimit, 'Should be two students']
  },
  name:{
    type: String,
    unique: true,
    required: [true, 'give me a recording name, at least 3 letters'],
    minlength: 3
  },
  comments: {
    type:String,
    maxlength: 140
  },
  cognitive: [{ //First object for student A, second for estudent B. 
    //* first value for before and second value for after recording.
    // * third value for o future recordings
    startingConversation: [{ type: Boolean, default: false, }], 
    risk: [{ type: Boolean, default: false, }], 
    opinion: [{ type: Boolean, default: false, }],
    askClarification: [{ type: Boolean, default: false, }],
    provClarification: [{ type: Boolean, default: false, }],
    askExamples: [{ type: Boolean, default: false, }],
    giveExamples: [{ type: Boolean, default: false, }],
    understanding: [{ type: Boolean, default: false, }],
    eyeContact: [{ type: Boolean, default: false, }],
    saySomething: [{ type: Boolean, default: false, }],
    filters: [{ type: Boolean, default: false, }],
  }],
  socioAffective : [{
    feel: {
      type: String,
      enum: ['confident', 'lost', 'nervous', 'nothing'],
    },
    help: Boolean
  }],
  audioIds: [[String]],
  audioId: String, 
  complete:  {
    type:Boolean,
    default: false
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

function arrayLimit(val) {
  //! this doesn't validatae if the user is empty ""
  return val.length === 2;
}

recordingSchema.post('save', function (error, _, next) {
    next( error.code === 11000 
      ?   new Error('That recording name already exist')
      :   error)
});


const Recording = mongoose.model('Recording', recordingSchema);
module.exports = Recording;