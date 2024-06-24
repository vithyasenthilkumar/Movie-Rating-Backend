const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    filename: function(request, file, callback){
        callback(null, file.originalname)
    },
    destination: function(request, file, callback)
    {
        callback(null, './Uploads')
    },

})

const videoFileFilter = (request,file,callback) => {


    const fileTypes = /mp4|mov|avi|mkv/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype)
    if(extname && mimetype){
        return callback(null, true);
    }
    else{
        return callback(new Error('Invalid file name!'));
    }
}

const Uploads = multer({
    storage,
    fileFilter:videoFileFilter,
    limits:{fileSize:100000000}
})
module.exports = Uploads



