import type Product from '../../../domain/product/entity/product'
import type ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { type InputListProductDto, type OutputListProductDto } from './list.product.dto'

export default class ListProductUseCase {
  private readonly productRepository: ProductRepositoryInterface
  constructor (ProductRepository: ProductRepositoryInterface) {
    this.productRepository = ProductRepository
  }

  async execute (input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return OutputMapper.toOutput(products)
  }
}

class OutputMapper {
  static toOutput (product: Product[]): OutputListProductDto {
    return {
      products: product.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}
