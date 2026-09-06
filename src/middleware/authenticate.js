import createHttpError from 'http-errors';

import { User } from '../models/user.js';
import { Session } from '../models/session.js';

export const authenticate = async (req, res, next) => {
  const { sessionId, accessToken } = req.cookies;

  if (!accessToken || !sessionId) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await Session.findOne({ _id: sessionId, accessToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.accessTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await User.findById(session.userId);
  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;

  next();
};
