import { Router } from 'express';
import { RechargeController } from '../controllers/recharge.controller';
import { validateSchema } from '../middlewares/validation.middleware';
import { rechargeSchema } from '../schemas/recharge.schema';

const rechargeRouter = Router();
const rechargeController = new RechargeController();

rechargeRouter.post('/', validateSchema(rechargeSchema), (req, res, next) => {
  rechargeController.create(req, res).catch(next);
});

rechargeRouter.get('/:number', (req, res, next) => {
  rechargeController.findByPhoneNumber(req, res).catch(next);
});

export default rechargeRouter;