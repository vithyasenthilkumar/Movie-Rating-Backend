const moviemodel = require('../model/Moviemodel')
const movieInitialData = require('../data/Moviedata')

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

module.exports = {getAllMovies,SearchMovie}
