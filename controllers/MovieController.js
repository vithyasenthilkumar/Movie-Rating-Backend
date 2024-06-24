const moviemodel = require('../model/Moviemodel')
const movieInitialData = require('../data/Moviedata')

const AddmanyMovies = async(request,response) => {
    try
    {
        const movies = await moviemodel.insertMany(request.body)
        console.log(request.body)
        response.status(200).json(movies)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const getAllMovies = async (request,response) => {
    try{
        const movie = await moviemodel.find()
        console.log(movieInitialData)
        if(movie.length === 0){
            const addMovieData = await moviemodel.insertMany(movieInitialData)
            return response.status(200).json(addMovieData)
        }
        response.status(200).json(movie)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

const addNewMovie = async(request,response) => {
    const newMovie = request.body
    try{
        const existingmovie = await moviemodel.findOne({MovieName:request.body.MovieName,Movieyear:request.body.Movieyear})
        if(existingmovie){
            return response.status(409).json({message:'Movie Already Exits.'})
        }
        const movie = await moviemodel.create(newMovie)
        response.status(201).json(movie)
    }
    catch(error){
        response.status(500).json({message:error.message})
    }
}

const UpdateMovie = async(request,response) => {
    const movietobeUpdated = request.body
    console.log(movietobeUpdated)
    try{
        console.log("lo")
        const movie = await moviemodel.findOneAndUpdate({_id:movietobeUpdated._id}, movietobeUpdated)
        response.status(201).json(movie)
    }
    catch(error)
    {
        response.status(500).json({message:error.message})
    }
}

async function getMovie(request,response){
    // console.log("Hello")
    let movie;
    try{
        movie = await moviemodel.findOne({ _id: request.params._id});
        if(!movie){
            return response.status(404).json({message:`Cannot find movie`})
        }
        response.status(200).json({
            message:"Get movie by id",
            data:movie
        })
    }catch(error){
         response.status(500).json({message:error.message});
    }
}

const RemoveMovie = async(request,response) => {
    try{
        await moviemodel.findOneAndDelete({_id:request.params._id});
        response.json({message:`Removed the Movie`});
    }catch(error){
        response.status(500).json({message:error.message});
    }
};


const SearchMovie = async(request,response) => {
    try{
        const {MovieName , MovieYear} = request.body;
        const searchedMovie = await moviemodel.find({
            $and:[{$or:[
                {MovieName:MovieName},
                {MovieYear:MovieYear}
            ]},
        {$or:[
            {MovieName:MovieName},
            {MovieYear:MovieYear}
        ]}]
        }).sort({Rating:-1})
        response.status(200).json(searchedMovie)
    }
    catch(error){
        response.status(500).json({ErrorMessage:error.message})
    }
}
  
module.exports = {getAllMovies,addNewMovie,UpdateMovie,AddmanyMovies,getMovie,SearchMovie,RemoveMovie}