const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const checkHref = (href, helpers) => {
  if (validator.isURL(href)) {
    return href;
  }
  return helpers.message('Невалидная ссылка');
};

module.exports.addMovieValidation = celebrate({
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
    movieId: Joi.number().required(),
  }),
});

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).required()
      .custom((cardId, helpers) => {
        if (ObjectId.isValid(cardId)) {
          return cardId;
        }
        return helpers.message('Невалидный id');
      }),
  }),
});
