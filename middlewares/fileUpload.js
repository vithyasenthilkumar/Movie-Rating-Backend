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

const Uploads = multer({storage})
module.exports = Uploads



