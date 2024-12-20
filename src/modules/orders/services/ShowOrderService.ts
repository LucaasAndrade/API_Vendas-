import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import AppError from '../../../shared/errors/appError';
import Order from '../typeorm/entities/Order';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order | undefined> {
    const orderRepository = new OrdersRepository();

    const orderExist = orderRepository.findById(id);
    if (!orderExist) throw new AppError('Order not found!');

    return orderExist;
  }
}

export default ShowOrderService;
