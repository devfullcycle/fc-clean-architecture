import type Customer from '../../../domain/customer/entity/customer'
import type CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import {
  type InputListCustomerDto,
  type OutputListCustomerDto
} from './list.customer.dto'

export default class ListCustomerUseCase {
  private readonly customerRepository: CustomerRepositoryInterface
  constructor (CustomerRepository: CustomerRepositoryInterface) {
    this.customerRepository = CustomerRepository
  }

  async execute (input: InputListCustomerDto): Promise<OutputListCustomerDto> {
    const customers = await this.customerRepository.findAll()
    return OutputMapper.toOutput(customers)
  }
}

class OutputMapper {
  static toOutput (customer: Customer[]): OutputListCustomerDto {
    return {
      customers: customer.map((customer) => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.Address.street,
          number: customer.Address.number,
          zip: customer.Address.zip,
          city: customer.Address.city
        }
      }))
    }
  }
}
