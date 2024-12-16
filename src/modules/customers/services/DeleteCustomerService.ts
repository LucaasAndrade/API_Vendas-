import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/appError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found.');
    }

    await customersRepository.remove(customer);
  }
}

export default ShowCustomerService;
