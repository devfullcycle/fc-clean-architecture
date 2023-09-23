import Product from '../../../domain/product/entity/product'
import FindCustomerUseCase from './find.product.usecase'

const randomUUID = '890d319c-7a1b-4723-af3b-d721b62dc320'
const product = new Product(randomUUID, 'Product', 50)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit Test find product use case', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindCustomerUseCase(productRepository)

    const input = {
      id: randomUUID
    }

    const output = {
      id: randomUUID,
      name: 'Product',
      price: 50
    }

    const result = await usecase.execute(input)

    expect(result).toEqual(output)
  })

  it('should not find a product', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found')
    })
    const usecase = new FindCustomerUseCase(productRepository)

    const input = {
      id: randomUUID
    }

    expect(async () => {
      return await usecase.execute(input)
    }).rejects.toThrow('Product not found')
  })
})
