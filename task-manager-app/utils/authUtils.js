const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user.id }, 'jwtSecret', { expiresIn: '1h' });
};

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const comparePasswords = async (enteredPassword, savedPassword) => {
  return bcrypt.compare(enteredPassword, savedPassword);
};

module.exports = {
  generateToken,
  hashPassword,
  comparePasswords,
};