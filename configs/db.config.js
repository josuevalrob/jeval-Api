const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const uri = "mongodb+srv://"+ process.env.MONGO_USER +":"+ process.env.MONGO_PASS +"@" + process.env.MONGO_CLUSTER;
mongoose.connect(uri, { useCreateIndex: true, useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to de database ${process.env.MONGO_CLUSTER}`))
  .catch(error => console.error(`An error ocurred trying to connect to the database ${process.env.MONGO_CLUSTER}`, error))
