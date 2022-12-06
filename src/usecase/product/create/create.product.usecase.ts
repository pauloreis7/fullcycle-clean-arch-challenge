import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {
  InputCreateProductDto,
  OutputCreateProductDto
} from './create.product.dto'

export class CreateProductUseCase {
  constructor(private productsRepository: ProductRepositoryInterface) {}

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.createProductA(input.name, input.price)

    await this.productsRepository.create(product)

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    return output
  }
}
