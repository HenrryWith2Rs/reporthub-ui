// utils/authUtils
import jwt, { JwtPayload } from 'jsonwebtoken';

export function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      throw new Error('Invalid token');
    }

    const { sub, name, role, iat, exp } = decoded as JwtPayload;

    // return { sub, name, role, iat, exp };
    return decoded as JwtPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
