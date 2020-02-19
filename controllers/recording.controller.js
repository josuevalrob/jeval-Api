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
  fs.mkdirSync(messageFolder);
}
module.exports.singleAudio = (req, res, next) => {
  const {id} = req.params
  const {audioName, audio} = req.body
  Recording
    .findOneAndUpdate(
      {_id: id}, 
      {audioId:audioName}, 
      { new: true, runValidators: true, useFindAndModify: false })
    .then( recording => {
      if (recording)
        writeFile(messageFolder + audioName, audio, 'base64')
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
  const id = req.params.id
  req.body.owner = req.user.id
  Recording.findOneAndUpdate(
    {_id: id},
    req.body,
    { new: true, runValidators: true, useFindAndModify: false })
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
  new Recording(req.body)
    .save()
    .then(recording => {
      res.status(201).json(recording)
    })
    .catch(next)
}

module.exports.all = (req, res, next) => {
  Recording.find()
    .then(recording => {
      if(recording.length){
        const preview = recording.map(r=>({
          id: r.id,
          name: r.name,
          students: r.students,
          date: r.createdAt, 
          audioId: r.audioId
        }))
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
    // .populate('owner')  //? current user
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