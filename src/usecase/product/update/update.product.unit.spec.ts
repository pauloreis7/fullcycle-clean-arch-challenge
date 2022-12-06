import Product from '../../../domain/product/entity/product'
import { UpdateProductUseCase } from './update.product.usecase'

const product = new Product('123', 'Product', 10)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test update product use case', () => {
  it('should update a product', async () => {
    const productsRepository = MockRepository()
    const updateProductUseCase = new UpdateProductUseCase(productsRepository)

    const input = {
      id: '123',
      name: 'Product updated',
      price: 20
    }

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
