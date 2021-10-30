const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Unathorized' });
  }

  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    // console.log(verified);

    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send({ message: 'invalid token' });
  }
};

exports.adminOnly = (req, res, next) => {
  if (req.user.role && req.user.role === 'admin') {
    next();
    return;
  }
  res.status(403).send({ message: 'Forbidden' });
};
