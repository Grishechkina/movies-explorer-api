const router = require('express').Router();
const { addMovieValidation, deleteMovieValidation } = require('../validation/movieValidation');
const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', addMovieValidation, addMovie);
router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
