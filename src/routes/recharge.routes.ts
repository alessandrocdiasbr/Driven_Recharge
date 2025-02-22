import { Router } from 'express';
import { RechargeController } from '../controllers/recharge.controller';
import { validateSchema } from '../middlewares/validation.middleware';
import { rechargeSchema } from '../schemas/recharge.schema';

const router = Router();
const controller = new RechargeController();

router.post('/recharges', validateSchema(rechargeSchema), controller.create.bind(controller));
router.get('/recharges/:number', controller.findByPhoneNumber.bind(controller));

export default router;