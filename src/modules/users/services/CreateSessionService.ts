import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/appError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { compareSync } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

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

    const token = sign({}, 'b68d3da56e4fb4b2e5336d7256174004', {
        subject: user.id,
        expiresIn: '1d',
    })

    return {
        user,
        token,
    };
  }
}

export default CreateSessionSerive;
