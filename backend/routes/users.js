// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');
const userController = require('../controllers/users');

router.get('/api/', userController.readAllUsers);

router.get('/api/me', userController.readUser);

router.patch('/api/me', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), userController.updateUser);

router.get('/api/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), userController.readTheUser);

router.patch('/api/me/avatar', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    // eslint-disable-next-line no-useless-escape
    avatar: Joi.string().pattern(/^(https?:\/\/)?([a-z0-9]+(-[a-z0-9]+)*\.)[^\s@]*$/i),
  }),
}), userController.updateUserAvatar);

module.exports = router;
