import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase';
import { verifyCustomToken } from '../controllers/authController';
import { UnauthorizedError } from '../utils/errors';

export interface AuthenticatedUser {
  uid: string;
  email?: string;
  displayName?: string;
  isSuperAdmin: boolean;
  emailVerified?: boolean;
}

export interface AuthenticatedRequest extends Request {
  user?: AuthenticatedUser;
  workspaceId?: string;
  workspaceRole?: string;
}

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      error: 'UNAUTHORIZED',
      message: 'Missing or malformed Authorization header with Bearer token.',
    });
    return;
  }

  const token = authHeader.split('Bearer ')[1].trim();

  if (!token) {
    res.status(401).json({
      error: 'EMPTY_TOKEN',
      message: 'Bearer token value cannot be empty.',
    });
    return;
  }

  // 1. Try custom backend JWT token first
  const customDecoded = verifyCustomToken(token);
  if (customDecoded) {
    const isOwnerSuperAdmin = customDecoded.email?.toLowerCase() === 'ajayx3neha@gmail.com' || !!customDecoded.isSuperAdmin;
    req.user = {
      uid: customDecoded.uid,
      email: customDecoded.email,
      displayName: customDecoded.displayName,
      isSuperAdmin: isOwnerSuperAdmin,
      emailVerified: true,
    };
    next();
    return;
  }

  // 2. Try Firebase Admin ID token
  try {
    const decodedToken = await auth.verifyIdToken(token, true); // true = checkRevoked
    const isOwnerSuperAdmin = decodedToken.email?.toLowerCase() === 'ajayx3neha@gmail.com';
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      isSuperAdmin: isOwnerSuperAdmin,
      emailVerified: decodedToken.email_verified,
    };
    next();
  } catch (error: any) {
    // 3. Controlled test harness / development fallback for automated testing
    if (process.env.NODE_ENV !== 'production' && token.startsWith('test-token-')) {
      const parts = token.replace('test-token-', '').split(':');
      const uid = parts[0];
      const isSuper = parts[1] === 'superadmin' || uid.includes('ajay');

      req.user = {
        uid: uid || 'usr_test_default',
        email: uid.includes('ajay') ? 'ajayx3neha@gmail.com' : `${uid}@test.local`,
        isSuperAdmin: isSuper,
        emailVerified: true,
      };
      next();
      return;
    }

    res.status(401).json({
      error: 'INVALID_OR_REVOKED_TOKEN',
      message: 'The provided authentication token is invalid or expired.',
    });
  }
};
