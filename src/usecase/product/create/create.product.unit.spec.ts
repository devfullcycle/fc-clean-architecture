import CreateProductUseCase from "./create.product.usecase";

const productCreateTestingInput = {
  type: "a",
  name: "my testing product name",
  price: 20000,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(productCreateTestingInput);

    expect(output).toEqual({
      id: expect.any(String),
      name: "my testing product name",
      price: 20000,
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    productCreateTestingInput.name = "";

    await expect(productCreateUseCase.execute(productCreateTestingInput)).rejects.toThrow(
      "Name is required"
    );
  });
});
