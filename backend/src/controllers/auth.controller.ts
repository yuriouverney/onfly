import { Request, Response, Router } from 'express';
import AuthGeralService from '../services/auth.service';
import wrapAsync from '../util/middleware/wrap-async';

const router = Router();

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 example: 'johndoe'
 *                 type: string
 *               password:
 *                 example: '123'
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *       400:
 *         description: Invalid username or password
 */

router.post(
  '/login',
  wrapAsync(async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const access_token = await AuthGeralService.login(username, password);
    res.json({ access_token });
  })
);

export default router;
