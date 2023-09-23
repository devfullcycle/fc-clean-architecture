import ProductFactory from '../../../domain/product/factory/product.factory'
import UpdateProductUseCase from './update.product.usecase'

const product = ProductFactory.create('a', 'Product', 20)

const input = {
  id: product.id,
  name: product.name,
  price: product.price
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn()
  }
}

describe('Unit test for customer update use case', () => {
  it('should update a customer', async () => {
    const customerRepository = MockRepository()
    const customerUpdateUseCase = new UpdateProductUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
