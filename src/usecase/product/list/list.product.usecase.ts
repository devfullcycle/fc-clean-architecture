import Product from "../../../domain/product/entity/product";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  private productRepositoy: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepositoy = productRepository;
  }

  async execute(input: InputListProductDto): Promise<OutputListProductDto> {
    const product = await this.productRepositoy.findAll();

    return OutputMapper.toOutput(product);
  }
}

class OutputMapper {
  static toOutput(product: Product[]): OutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
