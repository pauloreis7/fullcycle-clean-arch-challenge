import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'

import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import { UpdateProductUseCase } from './update.product.usecase'

describe('Test update product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update a product', async () => {
    const productsRepository = new ProductRepository()
    const updateProductUseCase = new UpdateProductUseCase(productsRepository)

    const product = new Product('123', 'Product', 10)

    await productsRepository.create(product)

    const input = {
      id: '123',
      name: 'Product updated',
      price: 20
    }

    const output = await updateProductUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
