import { Request, Response, Router } from 'express';
import AuthGeralService from '../services/auth.service';
import wrapAsync from '../util/middleware/wrap-async';

const router = Router();

router.post(
  '/login',
  wrapAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const access_token = await AuthGeralService.login(username, password)
    res.json({access_token});
  })
);

export default router;