import crypto from 'crypto';

export function hashKey(rawKey) {
  return crypto.createHash('sha256').update(rawKey).digest('hex');
}

export function generateRawKey() {
  return crypto.randomBytes(24).toString('base64url'); // URL-safe, no padding chars to mistype
}