const path = require('path')
const File = require('../model/Filemodel')
const parentDirectory = path.resolve(__dirname, '..');


const addFile = async(request,response) =>
    {
        if(!request.file)
            {
                return response.status(400).json({ErrorMessage:'No file was uploaded.'})
            }
            const {originalname, size, mimetype, destination, filename} = request.file;
        
            try{
                const existingFile = await File.findOne({originalname:originalname})
                if (existingFile)
                {
                    return response.status(409).json({ErrorMessage:'File already exists'})
                }
        
                const filePath = `http://localhost:3500/api/v1/movie_rating/admin/Uploads/`+filename
        
                
                const fileData = {
                    originalname: originalname,
                    size:size,
                    mimetype:mimetype,
                    destination:destination,
                    filename:filename,
                    filePath:filePath
                }
                console.log(originalname)
                const newFileData = await File.create(fileData)
                console.log(newFileData);
               
                response.status(200).json(newFileData)
            }
            catch(error)
            {
                response.status(500).json({ErrorMessage:error.message})
            }
    }

    const displayFile = (request,response) => {
        const fileName = request.params.fileName
        const filePath = path.join(parentDirectory,'/Uploads', fileName)
        response.status(200).sendFile(filePath)
    }
module.exports={addFile,displayFile}
