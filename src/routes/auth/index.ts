import { Router } from 'express';
import validate from '../../helpers';
import { loginSchema, registerSchema } from '../../schemas/authSchema';
import { login, registerUser } from '../../controllers/auth';

const authRouter = Router();
authRouter.post('/register', validate(registerSchema), registerUser);
authRouter.post('/login', validate(loginSchema), login);

export default authRouter;
