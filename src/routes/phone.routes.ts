import { Router } from 'express';
import { PhoneController } from '../controllers/phone.controller';
import { validateSchema } from '../middlewares/validation.middleware';
import { phoneSchema } from '../schemas/phone.schema';

const phoneRouter = Router();
const phoneController = new PhoneController();

phoneRouter.post('/', validateSchema(phoneSchema), (req, res, next) => {
  phoneController.create(req, res, next); 
});

// Importante: rota mais específica deve vir primeiro
phoneRouter.get('/summary/:document', (req, res, next) => {
  phoneController.getSummary(req, res, next); 
});

phoneRouter.get('/:document', (req, res, next) => {
  phoneController.findByDocument(req, res, next); 
});

export default phoneRouter;