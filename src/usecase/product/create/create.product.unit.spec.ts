import CreateProductUseCase from "./create.product.usecase";

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

  it("should throw an error when name is missing", async () => {
    /* Context */
    const productRepository = MockRepository;
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    /* Act */
    input.name = "";

    /* Assert */
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should throw an error when price be less than zero", async () => {
    /* Context */
    const productRepository = MockRepository;
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    /* Act */
    input.name = "PlayStation 5";
    input.price = -1;

    /* Assert */
    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
