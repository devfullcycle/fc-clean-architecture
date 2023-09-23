import CreateProductUseCase from './create.product.usecase'

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test create product use case', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const productCreateUseCase = new CreateProductUseCase(productRepository)

    const input = {
      name: 'Product 1',
      price: 10,
      type: 'a'
    }

    const output = await productCreateUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    })
  })

  it('should thrown an error when type is not a or b', async () => {
    const customerRepository = MockRepository()
    const customerCreateUseCase = new CreateProductUseCase(customerRepository)

    const input = {
      name: 'Product 1',
      price: 10,
      type: 'c'
    }

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Product type not supported'
    )
  })

  it('should thrown an error when price is negative', async () => {
    const customerRepository = MockRepository()
    const customerCreateUseCase = new CreateProductUseCase(customerRepository)

    const input = {
      name: 'Product 1',
      price: -10,
      type: 'b'
    }

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Price must be greater than zero'
    )
  })

  it('should thrown an error when name is missing', async () => {
    const customerRepository = MockRepository()
    const customerCreateUseCase = new CreateProductUseCase(customerRepository)

    const input = {
      name: '',
      price: 10,
      type: 'b'
    }

    await expect(customerCreateUseCase.execute(input)).rejects.toThrow(
      'Name is required'
    )
  })
})
