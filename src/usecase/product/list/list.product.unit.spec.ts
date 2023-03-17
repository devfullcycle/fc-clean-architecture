import ProductFactory from "../../../domain/product/factory/product.factory";

const product1 = ProductFactory.create("a", "PlayStation 5", 4999);
const product2 = ProductFactory.create("a", "Xbox Series S", 2700);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
  };
};

describe("Unit Test for listing product use case", () => {
  it("should list a product", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.product[0].id).toBe(product1.id);
    expect(output.product[0].name).toBe(product1.name);
    expect(output.product[0].price).toBe(product1.price);
    expect(output.product[1].id).toBe(product2.id);
    expect(output.product[1].name).toBe(product2.name);
    expect(output.product[1].price).toBe(product2.price);
  });
});
