import { Sequelize } from 'sequelize-typescript'

import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import { CreateProductUseCase } from './create.product.usecase'

describe('Test find customer use case', () => {
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

  it('should create a product', async () => {
    const productsRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productsRepository)

    const input = {
      name: 'John',
      price: 10
    }

    const result = await createProductUseCase.execute(input)

    const output = await productsRepository.find(result.id)

    expect(result).toEqual({
      id: output.id,
      name: output.name,
      price: output.price
    })
  })
})
