/* eslint-disable import/no-unresolved */
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const cardController = require('../controllers/cards');

router.get('/api/', cardController.readAllCards);

router.get('/api/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), cardController.readTheCard);

router.post('/api/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().pattern(/^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)[^\s@]*$/i),
  }),
}), cardController.createCard);

router.delete('/api/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), cardController.deleteCard);

router.put('/api/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), cardController.likeCard);

router.delete('/api/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), cardController.dislikeCard);

module.exports = router;
