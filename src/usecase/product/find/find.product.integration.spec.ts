import { Sequelize } from 'sequelize-typescript'
import Product from '../../../domain/product/entity/product'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import FindProductUseCase from './find.product.usecase'

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

  it('should find a customer', async () => {
    const productRepository = new ProductRepository()
    const usecase = new FindProductUseCase(productRepository)

    const randomUUID = '5dc19db2-6a25-407f-93db-98cdaca742d9'

    const product = new Product(randomUUID, 'Product', 40)

    await productRepository.create(product)

    const input = {
      id: randomUUID
    }

    const output = {
      id: randomUUID,
      name: 'Product',
      price: 40
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })
})
