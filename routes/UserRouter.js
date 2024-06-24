const express = require('express')
const router = express.Router()

const {getAllMovies,SearchMovie} = require('../controllers/UserControllers')
router.route('/get').get(getAllMovies)
router.route('/search').post(SearchMovie)
 module.exports = router