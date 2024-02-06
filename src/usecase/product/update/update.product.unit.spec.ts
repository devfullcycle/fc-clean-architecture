import { MockProductRepository, inputProduct1 } from "../mock";
import UpdateProductUseCase from "./update.product.usecase";

const inputUpdate = {
  id: inputProduct1.id,
  name: "Product 1 Updated",
  price: 100,
};


describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockProductRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(inputUpdate);
    expect(output).toEqual(inputUpdate);
  });
});
