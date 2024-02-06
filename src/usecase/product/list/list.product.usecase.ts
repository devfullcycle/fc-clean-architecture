
import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDto,
  OutputListProductDto,
} from "./list.product.dto";

export default class ListProductUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const product = await this.productRepository.findAll();
    return OutputMapper.toOutput(product);
  }
}

class OutputMapper {
  static toOutput(products: Product[]): OutputListProductDto {
    return {
      product: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
