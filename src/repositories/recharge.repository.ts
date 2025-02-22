import { pool } from '../config/database';
import { Recharge, CreateRechargeDTO } from '../protocols/recharge.types';

export class RechargeRepository {
  async create(recharge: CreateRechargeDTO): Promise<Recharge> {
    const { rows } = await pool.query<Recharge>(
      'INSERT INTO recharges (phone_id, value) VALUES ($1, $2) RETURNING *',
      [recharge.phone_id, recharge.value]
    );
    return rows[0];
  }

  async findByPhoneNumber(number: string): Promise<Recharge[]> {
    const { rows } = await pool.query<Recharge>(
      `SELECT r.* FROM recharges r
       JOIN phones p ON p.id = r.phone_id
       WHERE p.number = $1`,
      [number]
    );
    return rows;
  }
}