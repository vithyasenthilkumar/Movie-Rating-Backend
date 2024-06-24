const express = require('express')
const router = express.Router()
const {getAllMovies, addNewMovie, UpdateMovie, AddmanyMovies, getMovie, SearchMovie, RemoveMovie} = require('../controllers/MovieController')

const { addFile, displayFile } = require('../controllers/FileController')
const FileUpload = require('../middlewares/fileUpload')
const VideoUpload = require('../middlewares/videoUpload')
const {addVideo} = require('../controllers/VideoController')

router.route('/get').get(getAllMovies)
router.route('/add').post(addNewMovie)
router.route('/update').patch(UpdateMovie)

router.route('/many').post(AddmanyMovies)
router.route('/search').post(SearchMovie)
router.route('/:_id').get(getMovie).delete(RemoveMovie)

router.route('/upload').post(FileUpload.single('file'),addFile)
router.route('/uploadVideo').post(VideoUpload.single('video'),addVideo);
router.get('/display/:fileName',displayFile)

module.exports = router