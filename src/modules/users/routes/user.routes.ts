import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controllers/UserController';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';
import multer from 'multer';
import upload from '../../../config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const usersController = new UserController();
const usersAvatarController = new UserAvatarController();

const uploadConfig = multer(upload);

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  uploadConfig.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
