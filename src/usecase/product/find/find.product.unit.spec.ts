import { MockProductRepository, outputProduct1 } from "../mock";
import FindProductUseCase from "./find.product.usecase";

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    const productRepository = MockProductRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: outputProduct1.id,
    };

    const output = {
      id: outputProduct1.id,
      name: outputProduct1.name,
      price: outputProduct1.price,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find a product", async () => {
    const productRepository = MockProductRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
