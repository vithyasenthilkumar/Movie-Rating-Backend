require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3500
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const AdminLoginRouter = require('./routes/AdminLoginRouter')
const MovieRouter = require('./routes/MovieRouter')
const UserRouter = require('./routes/UserRouter')
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())


app.use('/api/v1/movie_rating/admin/login',AdminLoginRouter)
app.use('/api/v1/movie_rating/admin',MovieRouter)
app.use('/api/v1/movie_rating/user',UserRouter)

(async function (){
    try{
       const connection = await mongoose.connect(DB_URL);
       // console.log(connection);
       if(connection){
          console.log('Connected successfully to database');
       }
    }
    catch(error){
       console.log('Db Connection Failed:\n',error);
    }
 })();


app.listen(PORT,console.log(`Server listening at http://localhost:${PORT}/api/v1/movie_rating`))