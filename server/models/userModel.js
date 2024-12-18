const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    firstname : {
        type : String,
        required : true
    },
    lastname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false
    },
    passwordResetToken: {
        type: String,
      },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", userModel);