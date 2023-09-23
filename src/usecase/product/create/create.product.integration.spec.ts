import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from './create.product.usecase'

describe('Test create product use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product of type B', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: 'Product 1',
      type: 'a',
      price: 40

    }

    const result = await usecase.execute(input)

    expect(result.name).toEqual(input.name)
    expect(result.price).toEqual(input.price)

    expect(typeof result.id).toBe('string')
    expect(result.id).toHaveLength(36)
  })

  it('should create a product of type B', async () => {
    const productRepository = new ProductRepository()
    const usecase = new CreateProductUseCase(productRepository)

    const input = {
      name: 'Product 1',
      type: 'b',
      price: 40

    }

    const result = await usecase.execute(input)

    expect(result.name).toEqual(input.name)
    expect(result.price).toEqual(input.price * 2)

    expect(typeof result.id).toBe('string')
    expect(result.id).toHaveLength(36)
  })
})
