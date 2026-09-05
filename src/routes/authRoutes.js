import { Router } from 'express';

import {
  registerUser,
  loginUser,
  refreshUserSession,
  logoutUser,
} from '../controllers/authController.js';

import {
  registerUserSchema,
  loginUserSchema,
} from '../validations/authValidation.js';

const authRouter = Router();

authRouter.post('/register', registerUserSchema, registerUser);
authRouter.post('/login', loginUserSchema, loginUser);
authRouter.post('/refresh', refreshUserSession);
authRouter.post('/logout', logoutUser);

export default authRouter;
