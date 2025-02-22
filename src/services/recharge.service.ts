import { RechargeRepository } from '../repositories/recharge.repository';
import { PhoneRepository } from '../repositories/phone.repository';
import { CreateRechargeDTO, Recharge } from '../protocols/recharge.types';

export class RechargeService {
  private repository: RechargeRepository;
  private phoneRepository: PhoneRepository;

  constructor() {
    this.repository = new RechargeRepository();
    this.phoneRepository = new PhoneRepository();
  }

  async create(recharge: CreateRechargeDTO): Promise<Recharge> {
    return this.repository.create(recharge);
  }

  async findByPhoneNumber(number: string): Promise<Recharge[]> {
    const phone = await this.phoneRepository.findByNumber(number);
    if (!phone) {
      throw new Error('Phone not found');
    }
    return this.repository.findByPhoneNumber(number);
  }
}