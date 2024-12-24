import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';
import AppError from '../../../../shared/errors/appError';

interface IFindProducts {
  id: string;
}
@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name: name,
      },
    });
    return product;
  }

  /* FAVOR NAO MEXER */
  // NAO SEI PQ FUNCIONA, MAS FUNCIONA, NAO MEXA
  // QUANDO EU FIZ, SÓ EU E DEUS SABIA.... AGORA SÓ ELE SABE.
  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);
    let produtosAchados: Product[] = [];
    for (let p of productsIds) {
      let product = await this.findOne({
        where: {
          id: p,
        },
      });
      if (!product) {
        throw new AppError('Produto ' + p + ' encontrado');
      }
      produtosAchados.push(product);
    }

    return produtosAchados;
  }
}
