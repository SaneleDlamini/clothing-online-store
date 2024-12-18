const mongoose = require('mongoose');

const productModel = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    onSale : {
        type : Boolean,
        default : false
    },
    salePrice : {
        type : Number,
        default : 0
    },
    discount : {
        type : Number
    },
    quantity : {
        type : Number,
        required : true
    },
    image : {
        type : String,
        // required : true
    },
    category : {
        type : String,
        required : true
    },
    subCategory : {
        type : String,
        // required : true
    },
    gender : {
        type : String,
        required : true
    },
    size : {
        type : String,
    },
    color : {
        type : String,
    },
    totalInStock : {
        type : Number,
        required : true
    },
    isFeatured : {
        type : Boolean,
        default : false
    },
},
 {timestamps : true},
);

module.exports = mongoose.model("Product", productModel);