import { Router } from 'express';
import { check } from 'express-validator';
import { login, refreshToken, createNewUser } from '../controllers/authController';
import { fieldValidator } from '../middlewares/fieldValidator';
import { validateJWT } from '../middlewares/verifyToken';
const authRouter = Router();


authRouter.post('/', [
    check('email', 'name is required').isEmail(),
    check('password', 'name is required').isLength({ min: 6 }),
    fieldValidator,
], login);
authRouter.post('/create', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'name is required').isEmail(),
    check('password', 'name is required').isLength({ min: 6 }),
    fieldValidator,
], createNewUser);
authRouter.get('/refresh-token', [validateJWT], refreshToken)


export default authRouter;