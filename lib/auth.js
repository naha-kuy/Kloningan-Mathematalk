const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'mathematalk-jwt-secret-2026';

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

function getTokenFromCookies(request) {
  return request.cookies.get('mathematalk_token')?.value || null;
}

function getTokenFromHeader(request) {
  const auth = request.headers.get('authorization');
  if (!auth || !auth.startsWith('Bearer ')) return null;
  return auth.split(' ')[1];
}

module.exports = {
  signToken,
  verifyToken,
  hashPassword,
  comparePassword,
  getTokenFromCookies,
  getTokenFromHeader,
  JWT_SECRET,
};
