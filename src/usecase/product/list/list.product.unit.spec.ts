import { MockProductRepository, product1, product2 } from "../mock";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test for listing customer use case", () => {
  it("should list a customer", async () => {
    const repository = MockProductRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.product.length).toBe(2);
    expect(output.product[0].id).toBe(product1.id);
    expect(output.product[0].name).toBe(product1.name);
    expect(output.product[0].price).toBe(product1.price);
    expect(output.product[1].id).toBe(product2.id);
    expect(output.product[1].name).toBe(product2.name);
    expect(output.product[1].price).toBe(product2.price);
  });
});
