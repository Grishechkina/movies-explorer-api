const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const checkHref = (href, helpers) => {
  if (validator.isURL(href)) {
    return href;
  }
  return helpers.message('Невалидная ссылка');
};

router.get('/', getMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(checkHref),
      trailerLink: Joi.string().required().custom(checkHref),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().custom(checkHref),
      id: Joi.number().required(),
    }),
  }),
  addMovie,
);
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.number().required(),
    }),
  }),
  deleteMovie,
);

module.exports = router;
