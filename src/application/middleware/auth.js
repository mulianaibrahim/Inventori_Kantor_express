const jwt = require('jsonwebtoken');

const secret = 'very-secret';

function auth(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).send({
      message: 'butuh token'
    });

  }
  try {
    jwt.verify(authHeader, secret);
    return next();
  } catch (error) {
    return res.status(401).send({
      message: 'token salah'
    });

  }
}

module.exports = auth;