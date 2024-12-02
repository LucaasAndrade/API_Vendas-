import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import AppError from "../../../shared/errors/appError";
import UsersRepository from "../typeorm/repositories/UsersRepository";


interface IRequest{
  name: string;
  email: string;
  password: string;
}


class CreateUserService {
  public async execute({name, email, password}: IRequest): Promise<User> {
    const userRespository = getCustomRepository(UsersRepository);

    /*

    Não permitir que o email já exista no banco de dados

    */

    const emailExist = await userRespository.findByEmail(email);
    if (email) {
      throw new AppError("Email address already used.");
    }

    const user = userRespository.create({
      name,
      email,
      password,
    });

    await userRespository.save(user);

    return user;

  }
}

export default CreateUserService;
