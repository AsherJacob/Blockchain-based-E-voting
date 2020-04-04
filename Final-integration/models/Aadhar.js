const mongoose = require('mongoose');


const AadharSchema = new mongoose.Schema({
  name1: {
    type: String,
    required: true
  },
  ano1:{
      type: String,
      required: true
  },
  email1: {
    type: String,
    required: true
  },
  password1: {
    type: String,
    required: true
  }
});

const User = mongoose.model('Aadhar_details', AadharSchema);

module.exports = User;
