import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "PlayStation 5", 4999);

const input = {
  id: product.id,
  name: "PlayStation 5",
  price: 4999,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    /* Context */
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    /* Act */
    const output = await productUpdateUseCase.execute(input);

    /* Assert */
    expect(output).toEqual(input);
  });

  it("should throw an error when name is missing", async () => {
    /* Context */
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    /* Act */
    input.name = "";

    /* Assert */
    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Name is required"
    );
  });

  it("should update name and price a product", async () => {
    /* Context */
    const productRepository = MockRepository();
    productRepository.find.mockReturnValue(Promise.resolve(product));
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    /* Act */
    input.name = "PlayStation 5 Slim";
    input.price = 3999;

    const result = await productUpdateUseCase.execute(input);

    /* Assert */
    expect(result.name).toBe("PlayStation 5 Slim");
    expect(result.price).toBe(3999);
  });

  it("should update name a product", async () => {
    /* Context */
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    /* Act */
    input.name = "PlayStation 5 Slim";

    const result = await productUpdateUseCase.execute(input);

    /* Assert */
    expect(result.name).toBe(input.name);
  });

  it("should update price a product", async () => {
    /* Context */
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    /* Act */
    input.price = 3999;

    const result = await productUpdateUseCase.execute(input);

    /* Assert */
    expect(result.price).toBe(input.price);
  });

  it("should throw an error when price be less than zero", async () => {
    /* Context */
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    /* Act */
    input.name = "PlayStation 5";
    input.price = -1;

    /* Assert */
    await expect(productUpdateUseCase.execute(input)).rejects.toThrow(
      "Price must be greater than zero"
    );
  });
});
