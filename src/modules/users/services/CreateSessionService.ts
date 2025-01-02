import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../config/auth';
import AppError from '../../../shared/errors/appError';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionSerive {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRespository = getCustomRepository(UsersRepository);

    /*

    Não permitir que o email já exista no banco de dados

    */

    const user = await userRespository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = compareSync(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    if (!authConfig.jwt.secret) {
      throw new AppError('JWT secret is not defined.', 500);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionSerive;
