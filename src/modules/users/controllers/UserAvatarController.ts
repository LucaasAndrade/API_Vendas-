import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import AppError from '../../../shared/errors/appError';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<any> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      userId: request.user.id,
      avatarFileName: request.file?.filename,
    });

    return response.json(user);
  }
}
