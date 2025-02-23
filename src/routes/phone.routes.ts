import { Router } from 'express';
import { PhoneController } from '../controllers/phone.controller';
import { validateSchema } from '../middlewares/validation.middleware';
import { phoneSchema } from '../schemas/phone.schema';

const router = Router();
const controller = new PhoneController();

router.post('/phones', validateSchema(phoneSchema), (req, res, next) => {
  controller.create(req, res, next); 
});

router.get('/phones/:document', (req, res, next) => {
  controller.findByDocument(req, res, next); 
});

router.get('/summary/:document', (req, res, next) => {
  controller.getSummary(req, res, next); 
});

export default router;