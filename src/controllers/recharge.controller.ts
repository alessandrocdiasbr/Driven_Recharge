import { Request, Response } from 'express';
import { RechargeService } from '../services/recharge.service';

export class RechargeController {
  private service: RechargeService;

  constructor() {
    this.service = new RechargeService();
  }

  async create(req: Request, res: Response) {
    try {
      const recharge = await this.service.create(req.body);
      res.status(201).json(recharge);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      throw error;
    }
  }

  async findByPhoneNumber(req: Request, res: Response) {
    try {
      const recharges = await this.service.findByPhoneNumber(req.params.number);
      res.json(recharges);
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return res.status(404).json({ message: error.message });
      }
      throw error;
    }
  }
}
