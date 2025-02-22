import { Router } from 'express';
import { PhoneController } from '../controllers/phone.controller';
import { validateSchema } from '../middlewares/validation.middleware.ts';
import { phoneSchema } from '../schemas/phone.schema';

const router = Router();
const controller = new PhoneController();

router.post('/phones', validateSchema(phoneSchema), controller.create.bind(controller));
router.get('/phones/:document', controller.findByDocument.bind(controller));
router.get('/summary/:document', controller.getSummary.bind(controller));

export default router;