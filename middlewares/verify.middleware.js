const { verifyJwtToken } = require("../utils/jwt");
const { response } = require("../utils/responseService");
const { findOneUser } = require("../services/user.service");

exports.verifyToken = (role) =>{
  return async (req, res, next) => {
    try {
      if (
        
        !req.headers?.authorization &&
        req.headers.authorization?.split(" ")[0] !== "Bearer"
      ) {
        return response(res, 400, "Invalid token found");
      }
      const decoded = await verifyJwtToken(
        req.headers.authorization.split(" ")[1]
      );
  
      const user = await findOneUser({ _id: decoded.id });
      if (decoded) {
        if (!user) {
          return response(res, 404, "User not found");
        }
        req.user = decoded;
        // req.userId = decoded.id;
        // req.userRole = decoded.role;
        if (user.roleId.name !== role ) {
          return response(res, 401, `Unauthorized access! ${role} role required .`);
        }
        next();
      }
    } catch (error) {
      return response(res, error.code || 500, error.message);
    }
  };
}

// exports.isRole = (role) => {
//   return async (req, res, next) => {
//     if (!req.user.role.includes(role)) {
//       return response(res, 401, `Unauthorized access! ${role} role required .`);
//     }
//     next();
//   };
// };