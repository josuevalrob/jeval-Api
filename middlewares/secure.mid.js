const createError = require('http-errors');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(401));
  }
}


// module.exports.isOwner = (req, res, next) => {
// ! this function should be more generic. 
//   ClassRoom.findById(req.params.classRoomId)
//     .then(clazz => {
//       if(clazz.owner && clazz.owner == req.user.id){
//         req.classRoom = clazz // ? save the query...
//         next(); 
//       } else {
//         next(createError(401));
//       }
//     })
//     .catch(next)
// }

