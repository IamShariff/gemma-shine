import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.sendStatus(401);  // Unauthorized if no token is provided
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);  // Forbidden if token is invalid
      }
      req.user = user;
      next();
    });
};

export default authenticateJWT;
