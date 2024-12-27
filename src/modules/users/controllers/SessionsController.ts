import { Request, Response } from 'express';
import CreateSessionSerive from '../services/CreateSessionService';
import { classToClass } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<any> {
    const { email, password } = request.body;

    const createSession = new CreateSessionSerive();

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
