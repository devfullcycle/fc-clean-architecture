export interface InputListProductDto { }

type Product = {
  id: string;
  name: string;
  price: number;
};

export interface OutputListProductDto {
  product: Product[];
}
