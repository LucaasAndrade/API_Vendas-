import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../../products/typeorm/repositories/ProductsRepository';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '../../customers/typeorm/repositories/CustomersRepository';
import AppError from '../../../shared/errors/appError';
import Order from '../typeorm/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}
interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrdersRepository);
    const productRepository = getCustomRepository(ProductRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    /*

        VALIDAÇÃO DO CLIENTE
'
    */

    const customerExist = await customerRepository.findById(customer_id);
    if (!customerExist)
      throw new AppError('Could not find any customer with then given id.');

    const existsProducts = await productRepository.findAllByIds(products);

    if (!existsProducts?.length) {
      throw new AppError('Could not find any products with then given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find ${checkInexistentProducts[0].id}`);
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity  ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepository.createOrder({
      customer: customerExist,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
