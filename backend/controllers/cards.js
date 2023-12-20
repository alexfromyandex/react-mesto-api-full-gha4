/* eslint-disable no-unused-vars */
const cardModel = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');
const ForbiddenError = require('../errors/ForbiddenError');

function readTheCard(req, res, next) {
  const { cardId } = req.params;
  return cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      } return res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function readAllCards(req, res, next) {
  const userId = req.user._id;
  if (!userId) {
    throw new UnauthorizedAccessError('Необходима авторизация.');
  }
  return cardModel.find()
    .then((cards) => res.send(cards))
    .catch(next);
}

function createCard(req, res, next) {
  const { name, link } = req.body;
  return cardModel.create({ name, link, owner: req.user._id })
    // eslint-disable-next-line arrow-body-style
    .then((card) => {
      return res.status(201).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function deleteCard(req, res, next) {
  const { cardId } = req.params;
  cardModel.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      if (req.user._id === card.owner.toString()) {
        return cardModel.findByIdAndDelete(cardId)
          // eslint-disable-next-line no-shadow, arrow-body-style
          .then((card) => {
            return res.status(200).send({ data: card });
          });
      }
      throw new ForbiddenError('Вы не можете удалять чужие карточки.');
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function likeCard(req, res, next) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function dislikeCard(req, res, next) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }
      return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

module.exports = {
  readTheCard,
  readAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
