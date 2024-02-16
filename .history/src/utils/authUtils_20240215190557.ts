import jwt, { JwtPayload } from 'jsonwebtoken';

function decodeToken(token: string): JwtPayload | null {
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      throw new Error('Invalid token');
    }

    const { sub, name, role, iat, exp } = decoded as JwtPayload;

    return { sub, name, role, iat, exp };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

// Example usage:
const token = 'your_jwt_token_here';
const decodedToken = decodeToken(token);
if (decodedToken) {
  console.log('Decoded token:', decodedToken);
} else {
  console.log('Token decoding failed');
}
