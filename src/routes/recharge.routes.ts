import { Router } from 'express';
import { RechargeController } from '../controllers/recharge.controller';
import { validateSchema } from '../middlewares/validation.middleware';
import { rechargeSchema } from '../schemas/recharge.schema';

const router = Router();
const controller = new RechargeController();

router.post('/recharges', validateSchema(rechargeSchema), (req, res, next) => {
  controller.create(req, res).catch(next);
});

router.get('/recharges/:number', (req, res, next) => {
  controller.findByPhoneNumber(req, res).catch(next);
});

export default router;