import type CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import {
  type InputFindCustomerDto,
  type OutputFindCustomerDto
} from './find.customer.dto'

export default class FindCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface

  constructor (customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute (input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
    const customer = await this.customerRepository.find(input.id)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        city: customer.Address.city,
        number: customer.Address.number,
        zip: customer.Address.zip
      }
    }
  }
}
