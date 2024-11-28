import { Router, Request, Response } from "express";

const routes = Router();

routes.get('/', (_request: Request, response: Response): any => {
  console.log(typeof (response));
  return response.json({ message: 'Hello DEV!' });
});

export default routes;
