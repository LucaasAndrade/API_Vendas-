import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../typeorm/repositories/ProductsRepository";
import Product from "../typeorm/entities/Product";
import AppError from "../../../shared/errors/appError";

interface IRequest{
  id: string;
  name: string;
  price: number;
  quantity: number;
}


class UpdateProductService {
  public async execute({id, name, quantity, price} : IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    /*

    Não permitir que o produto seja cadastrado caso já exista o nome

    */

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError("Product not found!")
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists && product.name != name) {
      throw new AppError('There is already one product with this name');
    }


    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
