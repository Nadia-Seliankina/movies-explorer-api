import jwt from 'jsonwebtoken';
import { JWTconf } from './config';
/* eslint import/extensions: "off" */

// const { JWT_SECRET, NODE_ENV } = process.env;

export default function generateToken(payload) {
  // return jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', {
  return jwt.sign(payload, JWTconf, {
    expiresIn: '7d',
  });
}
