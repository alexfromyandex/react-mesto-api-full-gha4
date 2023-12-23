/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedAccessError = require('../errors/UnauthorizedAccessError');

function readTheUser(req, res, next) {
  const { userId } = req.params;
  return userModel.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с указанным _id не найден.');
      } return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function readAllUsers(req, res, next) {
  if (!req.user._id) {
    throw new UnauthorizedAccessError('Необходима авторизация.');
  }
  return userModel.find()
    .then((users) => res.send(users))
    .catch(next);
}

function readUser(req, res, next) {
  return userModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function createUser(req, res, next) {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      if (validator.isEmail(email) === false) {
        throw new BadRequestError('Указан неверный email.');
      }
      return res.status(201).send({ user: { name, about, avatar, email } });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: err.message }));
        return;
      } if (err.name === 'MongoServerError') {
        next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
        return;
      }
      next(err);
    });
}

function updateUser(req, res, next) {
  // eslint-disable-next-line max-len
  userModel.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function updateUserAvatar(req, res, next) {
  // eslint-disable-next-line max-len
  userModel.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, { new: true, runValidators: true, upsert: false })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError({ message: err.message }));
        return;
      }
      next(err);
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-puper-secret', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
      res.send({ token });
    })
    .catch(next);
}

module.exports = {
  readTheUser,
  readAllUsers,
  readUser,
  createUser,
  updateUser,
  updateUserAvatar,
  login,
};
