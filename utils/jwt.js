import jwt from 'jsonwebtoken';
import { JWTconf } from './config';
/* eslint import/extensions: "off" */

export default function generateToken(payload) {
  return jwt.sign(payload, JWTconf, {
    expiresIn: '7d',
  });
}
