

import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', async (req, resp) => {
  await productsController.index(req, resp);
});

productsRouter.get('/:id', async (req, resp) => {
  await productsController.show(req, resp);
});

productsRouter.post('/', async (req, resp) => {
  await productsController.create(req, resp);
});

productsRouter.put('/:id', async (req, resp) => {
  await productsController.update(req, resp);
});

productsRouter.delete('/:id', async (req, resp) => {
  await productsController.delete(req, resp);
});


export default productsRouter;
