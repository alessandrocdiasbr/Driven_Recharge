import { PhoneRepository } from '../repositories/phone.repository';
import { CreatePhoneDTO, Phone, PhoneSummary } from '../protocols/phone.types';
import { pool } from '../config/database';

export class PhoneService {
  private repository: PhoneRepository;

  constructor() {
    this.repository = new PhoneRepository();
  }

  async create(phone: CreatePhoneDTO): Promise<Phone> {
    // Validate carrier_id exists
    const { rows } = await pool.query('SELECT 1 FROM carriers WHERE id = $1', [phone.carrier_id]);
    if (rows.length === 0) {
      throw new Error('Operadora não encontrada');
    }

    const existingPhone = await this.repository.findByNumber(phone.number);
    if (existingPhone) {
      throw new Error('Phone number already exists');
    }

    const phoneCount = await this.repository.countByDocument(phone.document);
    if (phoneCount >= 3) {
      throw new Error('Maximum number of phones reached for this document');
    }

    return this.repository.create(phone);
  }

  async findByDocument(document: string): Promise<Phone[]> {
    return this.repository.findByDocument(document);
  }

  async getSummary(document: string): Promise<PhoneSummary> {
    return this.repository.getSummary(document);
  }
}