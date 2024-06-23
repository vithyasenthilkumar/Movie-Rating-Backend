const express = require('express')
const router = express.Router()
const {getAllMovies, addNewMovie, UpdateMovie, AddmanyMovies, getMovie, SearchMovie, RemoveMovie} = require('../controllers/MovieController')

const { UploadFile } = require('../controllers/FileController')
const FileUpload = require('../middlewares/fileUpload')

router.route('/').get(getAllMovies).post(addNewMovie).patch(UpdateMovie)

router.route('/many').post(AddmanyMovies)
router.route('/search').post(SearchMovie)
router.route('/:_id').get(getMovie).delete(RemoveMovie)

router.route('/upload').post(FileUpload.single('file'),UploadFile)

module.exports = router