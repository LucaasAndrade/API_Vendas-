import { getCustomRepository } from 'typeorm';

import AppError from '../../../shared/errors/appError';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    /*

    Não permitir que o email já exista no banco de dados

    */

    const emailExist = await customersRepository.findByEmail(email);

    if (emailExist) {
      throw new AppError('Email address already used.');
      // throw new Error("Teste");
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
