const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
    userId : {
        type : String
    },
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String
    },
    isAdmin : {
        type : Boolean
    },
    status : {
        type : String,
        default : "pending"
    },
    deliveredDate : {
        type : Date,
    },
    items : [
        {
            id : String,
            title : String,
            price : Number,
            quantity : Number,
            totalPrice : Number,
            image : String
        }
    ],
},{
    timestamps: true
});

module.exports = mongoose.model('Order', orderModel);

