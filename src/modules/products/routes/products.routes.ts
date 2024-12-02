

import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';


const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', async (req, resp) => {
  await productsController.index(req, resp);
});

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  async (req, resp) => {
  await productsController.show(req, resp);
});

productsRouter.post
  ('/',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    }
  }),
  async (req, resp) => {
  await productsController.create(req, resp);
});

productsRouter.put(
  '/:id',
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
  async (req, resp) => {
  await productsController.update(req, resp);
});

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    }
  }),
  async (req, resp) => {
  await productsController.delete(req, resp);
});


export default productsRouter;
