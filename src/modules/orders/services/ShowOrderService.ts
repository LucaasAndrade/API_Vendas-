import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import AppError from '../../../shared/errors/appError';
import Order from '../typeorm/entities/Order';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order | undefined> {
    const orderRepository = getCustomRepository(OrdersRepository);

    const orderExist = await orderRepository.findById(id);
    if (!orderExist) throw new AppError('Order not found!');

    return orderExist;
  }
}

export default ShowOrderService;
