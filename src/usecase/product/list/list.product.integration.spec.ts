import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import ListProductUseCase from './list.product.usecase'

describe('Test find customer use case', () => {
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

  it('should find the list of saved products', async () => {
    const productRepository = new ProductRepository()
    const usecase = new ListProductUseCase(productRepository)

    const randomUUID = '5dc19db2-6a25-407f-93db-98cdaca742d9'
    const randomUUID2 = 'db14b99e-fa32-4c91-be22-612ff922a846'

    const product1 = new Product(randomUUID, 'Product', 40)
    await productRepository.create(product1)

    const product2 = new Product(randomUUID2, 'Product2', 50)
    await productRepository.create(product2)

    const output = await usecase.execute({})
    expect(output.products.length).toBe(2)

    expect(output.products[0].id).toBe(product1.id)
    expect(output.products[0].name).toBe(product1.name)
    expect(output.products[0].price).toBe(product1.price)

    expect(output.products[1].id).toBe(product2.id)
    expect(output.products[1].name).toBe(product2.name)
    expect(output.products[1].price).toBe(product2.price)
  })
})
