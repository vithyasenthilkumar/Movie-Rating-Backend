const multer = require('multer')

const storage = multer.diskStorage({
    filename: function(request, file, callback){
        callback(null, file.originalname)
    },
    destination: function(request, file, callback)
    {
        callback(null, 'Uploads')
    },

})

const upload = multer({storage})
module.exports = upload


