import { MockProductRepository, inputProduct1 } from "../mock";
import CreateProductUseCase from "./create.product.usecase";

describe("Unit test create product use case", () => {
  it("should create a product", async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(inputProduct1);

    expect(output).toEqual({
      id: expect.any(String),
      name: inputProduct1.name,
      price: inputProduct1.price
    });
  });

  it("should thrown an error when name is missing", async () => {
    const productRepository = MockProductRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    inputProduct1.name = "";

    await expect(productCreateUseCase.execute(inputProduct1)).rejects.toThrow(
      "Name is required"
    );
  });
});
