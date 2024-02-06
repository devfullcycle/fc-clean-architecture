import { v4 as uuid } from "uuid";
import Product from "../../domain/product/entity/product";

export const inputProduct1 = {
  id: uuid(),
  name: "Product 1",
  price: 100,
}

export const inputProduct2 = {
  id: uuid(),
  name: "Product 3",
  price: 150,
}

export const product1 = new Product(inputProduct1.id, inputProduct1.name, inputProduct1.price);

export const outputProduct1 = {
  id: product1.id,
  name: product1.name,
  price: product1.price,
}

export const product2 = new Product(inputProduct2.id, inputProduct2.name, inputProduct2.price);

export const outputProduct2 = {
  id: product2.id,
  name: product2.name,
  price: product2.price,
}

export const MockProductRepository = () => {

  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product1)),
    findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
    create: jest.fn(),
    update: jest.fn(),
  };
};
