import { Router, Request, Response } from 'express';

import productsRouter from '../../../modules/products/routes/products.routes';
import usersRouter from '../../../modules/users/routes/user.routes';
import sessionRouter from '../../../modules/users/routes/session.routes';
import passwordRouter from '../../../modules/users/routes/password.routes';
import profileRouter from '../../../modules/users/routes/profle.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.get('/', (_request: Request, response: Response): any => {
  console.log(typeof response);
  return response.json({ message: 'Hello DEV!' });
});

export default routes;
