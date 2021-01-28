// const User = require('../models/user.model'); //? I got the user from passport.
const Recording = require('../models/recording.model');
const createError = require('http-errors');
var path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const messageFolder = './public/messages/'

if (!fs.existsSync(messageFolder)) {
  fs.mkdirSync(messageFolder, {recursive: true}, err => {});
}
module.exports.singleAudio = (req, res, next) => {
  const {id} = req.params
  const {query, audio} = req.body
  console.log('😅',query)
  Recording
    .findOneAndUpdate(
      {_id: id},
      {...query},
      { new: true, runValidators: true, useFindAndModify: false })
    .populate('participants')
    .then( recording => {
      if (recording)
        writeFile(messageFolder + query.audioId, audio, 'base64')
          .then(() => res.status(201).json(recording)) //everything is okey, response with 201
          .catch(err => { //! it should delete the id from recording.🤔
            console.log('Error writing audio to file', err);
            next(err)
          });
      else
        next(createError(404, 'recording not found'))
    })
    .catch(next)
}
module.exports.singleDelete = ( req,res,next ) => {
  const {id} = req.params
  const {audioName} = req.body
  Recording
    .populate('participants')
    .findOneAndUpdate(
      {_id: id}, 
      {audioId:''}, 
      { new: true, runValidators: true, useFindAndModify: false })
    .then((r)=>deleteData(r, audioName, res))
    .catch(next)
}
module.exports.createAudio = (req, res, next) => {
  const {id} = req.params
  const {audioName, audioIds, audio} = req.body
  Recording.findOneAndUpdate({_id: id}, {audioIds}, { new: true, runValidators: true, useFindAndModify: false })
    .populate('participants')
    .then( recording => {
      if(recording) {
        writeFile(messageFolder + audioName, audio, 'base64')
          .then(() => {
            res.status(201).json(recording)
          })
          .catch(err => { //! it should delete the id from recording.🤔
            console.log('Error writing audio to file', err);
            next(err)
          });
      } else {
        next(createError(404, 'recording not found'))
      }
    })
    .catch(next)
}

module.exports.deleteAudio = (req, res, next) => {
  const {id} = req.params
  const {audioName, audioIds} = req.body
  Recording.findOneAndUpdate({_id: id}, {audioIds}, { new: true, runValidators: true, useFindAndModify: false })
    .populate('participants')
    .then( recording => {
      if(recording) {
         fs.stat(messageFolder + audioName, function (err, stats) {
          // console.log(stats);//here we got all information of file in stats variable
          if (err) {
              return console.error(err);
          }
          fs.unlink(messageFolder + audioName,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
                res.status(204).send()
          });
        });
      } else {
        next(createError(404, 'recording not found'))
      }
    })
    .catch()

}

module.exports.update = (req, res, next) => {
  const id = req.params.id;
  req.body.owner = req.user.id;
  req.body.participants = req.body.students;
  Recording.findOneAndUpdate(
    {_id: id},
    req.body,
    { new: true, runValidators: true, useFindAndModify: false })
    .populate('participants')
    .then(recording => {
      if (recording) {
        res.status(201).json(recording)
      } else {
        next(createError(404, 'recording not found'))
      }
    })
    .catch(next)

}

module.exports.create = (req, res, next) => {
  req.body.owner = req.user.id
  //! refactor.
  /*
  In the first implementation we save the student name as string
  The current data can not be merge with the new implementation
  cuz it involves real users.
  Now we are expecting ID in the field student to merge it with 
  the requiered field "participants". 
  */
  req.body.participants = req.body.students;
  new Recording(req.body)
    .save()
    .then(newRecording => {
      Recording
        .findById(newRecording._id)
        .populate('participants')
        .then(recording => res.status(201).json(recording))
    })
    .catch(next)
}

module.exports.all = (req, res, next) => {
  Recording.find()
    .populate('participants')
    .then(recordings => {
      if(recordings.length){
        const preview = recordings.map(recording => {
          return ({
            id: recording.id,
            name: recording.name,
            audioId: recording.audioId,
            participants: recording.participants,
            // This condition is to merge previus implementation
            // which save the user as string.
            students: !!recording.participants.length
              ? recording.participants.map(obj=>obj.name)
              //! Student is deprecated
              : recording.students,
            date: recording.createdAt
          })
        })
        res.status(200).json(preview)
      } else {
        res.status(404).json({message:'No recording created.'})
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
//? it could be better for the performance if i divide this response.
  Recording.findById(req.params.id)
    .populate('participants')
    .then(recording => {
      res.status(201).json(recording)
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  //! here we should delete also the recording from message folder. 
  //* maybe a promise all with fs.unlink with all the message from the current recording
  Recording.findOneAndDelete({_id : req.params.id, owner: req.user.id})
    .then(recording => {
      if (!recording) {
        throw createError(404, 'Recording not found')
      }
      if(recording.audioId)
        deleteData(recording, recording.audioId, res)
      else
        res.status(204).send()
    })
    .catch(next)
}

const deleteData = (recording, audioName, res) => {
  if(recording) {
    fs.stat(messageFolder + audioName, function (err, stats) {
     // console.log(stats);//here we got all information of file in stats variable
     if (err) {
         return console.error(err);
     }
     fs.unlink(messageFolder + audioName,function(err){
           if(!err)
            console.log('file deleted successfully');          
           res.status(204).send()
     });
   });
 } else {
   next(createError(404, 'recording not found'))
 }
}
