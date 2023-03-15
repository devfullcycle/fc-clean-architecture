import Product from "../../../domain/product/entity/product";

const product = new Product("555", "PlayStation5", 4.999);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find product use case", () => {
  it("should find a product", async () => {
    /* Context */
    const productRepository = MockRepository();
    const usecase = new FindProductUseCase(productRepository);

    const input = {
      id: "555",
    };

    const output = {
      id: "555",
      name: "PlayStataion",
      price: 4.999,
    };

    /* Act */
    const result = await usecase.execute(input);

    /* Assert */
    expect(result).toEqual(output);
  });
});
