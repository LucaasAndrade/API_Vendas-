import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import AppError from "../../../shared/errors/appError";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import { hashSync } from "bcryptjs";


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
    
    if (emailExist) {
      throw new AppError("Email address already used.");
      // throw new Error("Teste");
    }

    const hashedPassword = await hashSync(password, 8);

    const user = userRespository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRespository.save(user);

    return user;

  }
}

export default CreateUserService;
