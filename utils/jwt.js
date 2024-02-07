import jwt from 'jsonwebtoken';
import { JWTconf } from '../config.js';
/* eslint import/extensions: "off" */

export default function generateToken(payload) {
  return jwt.sign(payload, JWTconf, {
    expiresIn: '7d',
  });
}
