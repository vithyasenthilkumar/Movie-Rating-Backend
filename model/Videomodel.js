const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true,
        default:'unknown',
        unique:true,
        index:true
    },
    path:{
        type:String,
        required:true
    },
    contentType:{
        type:String,
        required:true
    },
    size:{
        type:Number,
        required:true
    },
    fileType:{
        type:String,
        required:true
    }
}, {
    collection: 'Videos'
});

module.exports = mongoose.model('Videos', VideoSchema);
