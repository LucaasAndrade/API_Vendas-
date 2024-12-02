import { Router, Request, Response } from "express";
import productsRouter from "../../../modules/products/routes/products.routes";

const routes = Router();


routes.use('/products', productsRouter);

routes.get('/', (_request: Request, response: Response): any => {
  console.log(typeof (response));
  return response.json({ message: 'Hello DEV!' });
});

export default routes;
