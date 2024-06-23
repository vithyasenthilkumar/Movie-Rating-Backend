const mongoose = require('mongoose')

const genresEnum = ['Romance','Thriller','Action','Adventure','Fantasy','Crime','Biography','Horror','Comedy','Drama','Music']
const movie_ratingSchema = new mongoose.Schema(
    {
        MovieName:{
            type:String,
            required:true,
            unique:true,
            index:true
        },
        MovieYear:{
            type:String,
            required:true
        },
        MovieGenre1 : {
            type:String,
            enum:genresEnum,
            required: true
        },
        MovieGenre2 : {
          type:String,
          enum:genresEnum,
          required: true  
        },
        Rating:{
            type:Number,
            required:true,
            min:0,
            max:10
        },
        Synopsis:{
            type:String,
            required:true
        },
        DirectedBy:{
            type:String,
            required:true
        },
        Language:{
            type:String,
            required:true
        }
    },
    {
        collection:'Movies_Ratings',
        timestamps:true
    }
)


module.exports=mongoose.model('Movie_Ratings',movie_ratingSchema)