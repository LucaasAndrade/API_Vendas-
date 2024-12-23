import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import Order from '../typeorm/entities/Order';
import CreateOrderService from '../services/CreateOrderService';

export default class OrderController {
  public async show(
    request: Request,
    response: Response,
  ): Promise<Order | any> {
    const { id } = request.params;

    const showOrder = new ShowOrderService();
    const orderExist = await showOrder.execute({ id });

    return response.json(orderExist);
  }

  public async create(
    request: Request,
    response: Response,
  ): Promise<Response | any> {
    const { customer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
