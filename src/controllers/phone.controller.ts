import { Request, Response } from 'express';
import { PhoneService } from '../services/phone.service';

export class PhoneController {
  private service: PhoneService;

  constructor() {
    this.service = new PhoneService();
  }

  async create(req: Request, res: Response) {
    try {
      const phone = await this.service.create(req.body);
      res.status(201).json(phone);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return res.status(409).json({ message: error.message });
        }
        if (error.message.includes('Maximum number')) {
          return res.status(409).json({ message: error.message });
        }
      }
      throw error;
    }
  }

  async findByDocument(req: Request, res: Response) {
    const phones = await this.service.findByDocument(req.params.document);
    res.json(phones);
  }

  async getSummary(req: Request, res: Response) {
    const summary = await this.service.getSummary(req.params.document);
    res.json(summary);
  }
}