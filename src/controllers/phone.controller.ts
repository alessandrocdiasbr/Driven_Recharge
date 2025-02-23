import { Request, Response, NextFunction } from 'express';
import { PhoneService } from '../services/phone.service';

export class PhoneController {
  private service: PhoneService;

  constructor() {
    this.service = new PhoneService();
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const phone = await this.service.create(req.body);
      res.status(201).json(phone);
    } catch (error) {
      next(error); 
    }
  }

  async findByDocument(req: Request, res: Response, next: NextFunction) {
    try {
      const phones = await this.service.findByDocument(req.params.document);
      res.json(phones);
    } catch (error) {
      next(error); 
    }
  }

  async getSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await this.service.getSummary(req.params.document);
      res.json(summary);
    } catch (error) {
      next(error); 
    }
  }
}