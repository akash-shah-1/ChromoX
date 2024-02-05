
// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      // User is an admin, allow access to the route
      return next();
    } else {
      // User is not an admin, deny access
      return res.status(403).json({ message: 'Forbidden - Admin access required' });
    }
  };
  
  module.exports = isAdmin;
  