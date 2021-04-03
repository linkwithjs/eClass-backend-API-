const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({

    title : {
        type : String,
        required : true,
    },
    shortDesc:{
        type : String,

    },
    desc : {
        type : String
    },
    outcome : {
        type : String,
    },
    requirement : {
        type : String,
    },
    courseIncludes : {
        type : String,
    },
    category : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'category',
        required : true,
    },
    price : {
        type : Number,
        required : true
    },
    // hasDiscount : {
    //     type : Boolean,
    //     default : true
    // },
    discount : {
        type : Number,
        default : "0"
    },
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'user',
        required : true,

    },
    thumbnail : {
        type : String,

    },
    videoUrl : {
        type : String,
        required : true
    },
    ifFeatured : {
        type : Boolean,
        default : 0
    },
    status : {
        type : Boolean,
        default : 1
    }
    },
    {
        timestamps: true,
      })
    

    const courseModel = mongoose.model('course',courseSchema);
    module.exports = courseModel;
