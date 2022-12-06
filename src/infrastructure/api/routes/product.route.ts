import express, { Request, Response } from 'express'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase'
import ProductRepository from '../../product/repository/sequelize/product.repository'

export const productRoute = express.Router()

productRoute.post('/', async (request: Request, response: Response) => {
  const repository = new ProductRepository()
  const usecase = new CreateProductUseCase(repository)

  try {
    const createProductDto = {
      name: request.body.name,
      price: request.body.price
    }

    const output = await usecase.execute(createProductDto)

    response.send(output)
  } catch (err) {
    response.status(500).send(err)
  }
})

productRoute.get('/', async (request: Request, response: Response) => {
  const repository = new ProductRepository()
  const usecase = new ListProductUseCase(repository)

  try {
    const output = await usecase.execute({})

    response.send(output)
  } catch (err) {
    response.status(500).send(err)
  }
})
