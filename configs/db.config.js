const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => console.info(`Successfully connected to de database ${process.env.MONGO_ENV}`))
  .catch(error => console.error(`An error ocurred trying to connect to the database ${process.env.MONGO_ENV}`, error))