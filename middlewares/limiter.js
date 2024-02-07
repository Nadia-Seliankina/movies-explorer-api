import { rateLimit } from 'express-rate-limit';

export default function limiter(req, res, next) {
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  });
  next();
}
