import { pool } from '../config/database';
import { Phone, CreatePhoneDTO, PhoneSummary } from '../protocols/phone.types';

export class PhoneRepository {
  async create(phone: CreatePhoneDTO): Promise<Phone> {
    const { rows } = await pool.query<Phone>(
      `INSERT INTO phones (number, name, description, document, carrier_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [phone.number, phone.name, phone.description, phone.document, phone.carrier_id]
    );
    return rows[0];
  }

  async findByDocument(document: string): Promise<Phone[]> {
    const { rows } = await pool.query<Phone>(
      'SELECT * FROM phones WHERE document = $1',
      [document]
    );
    return rows;
  }

  async findByNumber(number: string): Promise<Phone | null> {
    const { rows } = await pool.query<Phone>(
      'SELECT * FROM phones WHERE number = $1',
      [number]
    );
    return rows[0] || null;
  }

  async countByDocument(document: string): Promise<number> {
    const { rows } = await pool.query<{ count: string }>(
      'SELECT COUNT(*) FROM phones WHERE document = $1',
      [document]
    );
    return parseInt(rows[0].count);
  }

  async getSummary(document: string): Promise<PhoneSummary> {
    const { rows } = await pool.query(`
      SELECT 
        p.id,
        p.number,
        c.name as carrier,
        json_agg(
          json_build_object(
            'value', r.value,
            'created_at', r.created_at
          )
        ) as recharges
      FROM phones p
      LEFT JOIN carriers c ON c.id = p.carrier_id
      LEFT JOIN recharges r ON r.phone_id = p.id
      WHERE p.document = $1
      GROUP BY p.id, p.number, c.name
    `, [document]);

    return {
      document,
      phones: rows.map(row => ({
        id: row.id,
        number: row.number,
        carrier: row.carrier,
        recharges: row.recharges || []
      }))
    };
  }
}