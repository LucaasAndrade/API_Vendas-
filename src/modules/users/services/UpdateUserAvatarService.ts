import User from '../typeorm/entities/User';
import AppError from '../../../shared/errors/appError';
import upload from '../../../config/upload';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

interface IRequest {
  userId: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ userId, avatarFileName }: IRequest): Promise<User> {
    const userRespository = getCustomRepository(UsersRepository);

    if (!avatarFileName) throw new AppError('AvatarFile unkdown');
    const user = await userRespository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;

    await userRespository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
