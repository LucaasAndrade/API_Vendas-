import { Request, response, Response } from 'express';

import ListCustomerService from '../services/ListCustomerService';
import CreateCustomerService from '../services/CreateCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomerController {
  public async index(_request: Request, response: Response): Promise<any> {
    const customerController = new ListCustomerService();
    const customers = await customerController.execute();

    return response.json(customers);
  }

  public async create(request: Request, response: Response): Promise<any> {
    const { name, email } = request.body;

    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async show(request: Request, response: Response): Promise<any> {
    const { id } = request.params;

    const showCustomer = new ShowCustomerService();
    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<any> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, _response: Response): Promise<any> {
    const { id } = request.params;

    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}
