const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {
        originalname:{
            type:String,
            required:true,
        },
        size:{
            type:Number,
            required:true
        },
        mimetype:{
            type:String,
            required:true
        },
        destination:{
            type:String,
            required:true
        },
        filename: {
            type:String,
            required:true,
        },
        filePath:{
            type:String,
            required:true,
        }
    }, {
    collection: 'Files'
});

module.exports = mongoose.model('Files', FileSchema);
