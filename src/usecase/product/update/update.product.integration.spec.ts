import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import UpdateProductUseCase from './update.product.usecase'
import Product from '../../../domain/product/entity/product'

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

  it('should update a product', async () => {
    const productRepository = new ProductRepository()

    const updateUseCase = new UpdateProductUseCase(productRepository)

    const randomUUID = '5dc19db2-6a25-407f-93db-98cdaca742d9'

    const product = new Product(randomUUID, 'Product', 40)

    await productRepository.create(product)

    const input = {
      id: randomUUID,
      name: 'Product',
      price: 40
    }

    const result = await updateUseCase.execute(input)

    expect(result.name).toEqual(input.name)
    expect(result.price).toEqual(input.price)
    expect(result.id).toEqual(input.id)
  })
})
