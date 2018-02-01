const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Shema
const UserSchema = new Schema({
  googleID:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  displayName: {
    type:String
  },
  gender: {
    type: String
  },
  image: {
    type: String
  },
  provider: {
    type: String
  },
  url: {
    type: String
  },
  isPlusUser: {
    type: Boolean
  },
  language: {
    type: String
  },
  isVerified: {
    type: Boolean
  }
});

// Create collection and add schema
mongoose.model('users', UserSchema);