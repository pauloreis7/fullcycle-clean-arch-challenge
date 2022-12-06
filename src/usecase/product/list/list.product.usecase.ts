import Product from '../../../domain/product/entity/product'
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'

export class ListProductUseCase {
  constructor(private productsRepository: ProductRepositoryInterface) {}

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productsRepository.findAll()

    const output = OutputMapper.toOutput(products)

    return output
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}
