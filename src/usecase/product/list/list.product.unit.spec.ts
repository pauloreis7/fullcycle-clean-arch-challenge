import ProductFactory from '../../../domain/product/factory/product.factory'
import { ListProductUseCase } from './list.product.usecase'

const product1 = ProductFactory.create('a', 'Product 1', 10)
const product2 = ProductFactory.create('a', 'Product 2', 20)

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test list product use case', () => {
  it('should list a product', async () => {
    const productsRepository = MockRepository()
    const listProductUseCase = new ListProductUseCase(productsRepository)

    const output = await listProductUseCase.execute({})

    expect(output.products.length).toBe(2)
    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)
    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})
