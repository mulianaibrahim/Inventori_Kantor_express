const jwt = require('jsonwebtoken');

const secret = 'very-sercret';

function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (authHeader) {
    res.status(401).send({ message: 'butuh token' });
    return;
  }
  try {
    jwt.verify(authHeader, secret);
    next();
  } catch (error) {
    res.status(401).send({ message: 'butuh token' });
    return;
  }
}

module.exports = auth;
