import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";


class ListUserService{
  public async execute(): Promise<User[]>{
    const userRepository = getCustomRepository(UsersRepository);

    const users = userRepository.find();

    return users;
  }
}


export default ListUserService;
