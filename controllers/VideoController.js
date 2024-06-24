const path = require('path')
const Video = require('../model/Videomodel')
const parentDirectory = path.resolve(__dirname, '..');


const addVideo = async(request,response) =>
    {
        const fileToBeAdded = request.file;
        const fileType = request.body.fileType || 'video';
        console.log(fileToBeAdded);
        const newFile = new Video({
            filename:fileToBeAdded.filename,
            path:fileToBeAdded.path,
            contentType:fileToBeAdded.mimetype,
            size:fileToBeAdded.size,
            fileType:fileType
        });
        try{
            await newFile.save();
       console.log(fileToBeAdded)
       response.status(201).send({message:"Uploaded Successfully"});
    }
    catch(error)
    {
        console.log(error);
        response.status(500).send({message:"Failed to Upload"});
    }
}
    const displayVideo = (request,response) => {
        const fileName = request.params.fileName
        const filePath = path.join(parentDirectory,'/Uploads', fileName)
        response.status(200).sendFile(filePath)
    }
module.exports={addVideo,displayVideo}
