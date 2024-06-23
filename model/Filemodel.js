const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    originalName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fileName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    filePath: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    size: {
        type: Number,
        required: true
    },
    mimeType: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    }
}, {
    collection: 'Files'
});

module.exports = mongoose.model('Files', FileSchema);
