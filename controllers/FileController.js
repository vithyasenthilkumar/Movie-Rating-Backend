const {response} = require('express')
const FileModel = require('../model/Filemodel')

const UploadFile = async(request, response) =>
    {
        if(!request.file)
            {
                return response.status(400).json({message:'No File was Uploaded.'})
            }

        console.log('File Information:',request.file)
        const {originalname:originalName, size:size, mimetype:mimeType, destination:destination, filename:fileName} = request.file;
        
        console.log('Extracted fields:',{originalName,size,mimeType,destination,fileName})

        if(!originalName || !fileName){
            console.log('File info is incomplete');
            return response.status(400).json({message:"File Information is Incomplete"});
        }
        try{
            const existingFile = await FileModel.findOne({originalname:originalName})
            if(existingFile)
                {
                    return response.status(409).json({messsage:"File already Exists"})
                }
            const filePath = `http://localhost:3500/api/v1/movie_rating/admin/Uploads/${fileName}`;
            const FileData = {
                 originalName,
                 size,
                mimeType,
                destination,
                fileName,
                filePath
            };
            console.log('FileData to be saved:',FileData)

            const newFileData = await FileModel.create(FileData)
            console.log(newFileData);
            response.status(200).json(newFileData)
        }
        catch(error)
        {
            console.error('Error Saving File:',error);
            response.status(500).json({message:error.message})
        }
}

module.exports = {UploadFile}