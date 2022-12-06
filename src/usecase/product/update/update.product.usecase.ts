import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import {
  InputUpdateProductDto,
  OutputUpdateProductDto
} from './update.product.dto'

export class UpdateProductUseCase {
  constructor(private productsRepository: ProductRepositoryInterface) {}

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productsRepository.find(input.id)

    product.changeName(input.name)
    product.changePrice(input.price)

    this.productsRepository.update(product)

    const output = {
      id: product.id,
      name: product.name,
      price: product.price
    }

    return output
  }
}
