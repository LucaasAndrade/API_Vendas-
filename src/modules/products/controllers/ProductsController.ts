import { Request, Response } from "express";

import CreateProductService from "../services/CreateProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";
import DeleteProductService from "../services/DeleteProductService";


export default class ProductsController {

  public async index(_request: Request, response: Response): Promise<any>{
    const listProducts = new ListProductService();
    const products = await listProducts.execute();

    return response.send(products);
  }

  public async show(request: Request, response: Response): Promise<Response | any>{
    const { id } = request.params;

    const showProduct = new ShowProductService();
    const product = await showProduct.execute({id});

    return product;
  }

  public async create(request: Request, response: Response): Promise<Response | any> {
    const { name, price, quantity } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      name,
      price,
      quantity
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response | any> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity
    })

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response | any> {
    const { id } = request.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({id});

    return response.json([]);
  }

};
