const MockRepository = {
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};

const input = {
  name: "PlayStation 5",
  price: 4999,
};

describe("Unit Test Create product use case ", () => {
  it("should create a product", async () => {
    /* Context */
    const productRepository = MockRepository;
    const productCreateUseCase = new CreateProductUseCase(productRepository);
    /* Act */
    const output = await productCreateUseCase.execute(input);

    /* Assert */
    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    });
  });

  it("should throw an error when name is missing", () => {
    /* Context */
    const productRepository = MockRepository;
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    /* Act */
    input.name = "";

    /* Assert */
    expect(async () => {
      return await productCreateUseCase.execute(input);
    }).rejects.toThrow("Name is required");
  });
});
