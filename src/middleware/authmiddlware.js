const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data;
    console.log(data);
    next();
  } catch (e) {
    if(e.name==="TokenExpiredError")
    {
      return res.status(401).json({ message: 'Token has expired' });
    }
    else if (e.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token format or signature' });
    }


    console.error('Error during token verification:', e.message);
    res.status(401).json({ message: 'Token is not valid' });
    
  }
};

module.exports = auth;
