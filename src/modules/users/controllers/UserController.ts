import { Request, Response } from 'express';

import CreateUserService from '../services/CreateUserService';
import ListUserService from '../services/ListUserService';

export default class UserController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response[] | any> {
    const listUser = new ListUserService();
    const users = await listUser.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<any> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }
}
