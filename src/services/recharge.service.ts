import { RechargeRepository } from '../repositories/recharge.repository';
import { PhoneRepository } from '../repositories/phone.repository';
import { CreateRechargeDTO, Recharge } from '../protocols/recharge.types';
import { pool } from '../config/database';

export class RechargeService {
  private repository: RechargeRepository;
  private phoneRepository: PhoneRepository;

  constructor() {
    this.repository = new RechargeRepository();
    this.phoneRepository = new PhoneRepository();
  }

  async create(recharge: CreateRechargeDTO): Promise<Recharge> {
    const { rows } = await pool.query('SELECT 1 FROM phones WHERE id = $1', [recharge.phone_id]);
    if (rows.length === 0) {
      throw new Error('Phone not found');
    }

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