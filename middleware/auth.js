const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
}

// Addmin Access only JWT token.
function authenticateAdminToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token)
    return res.status(401).send({ auth: false, message: "No token provided." });

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;
    req.userRole = decoded.role;

    // Check if user role is admin
    if (req.userRole !== "admin") {
      return res.status(403).send({
        auth: false,
        message: "Access forbidden. Admin role required.",
      });
    }

    next();
  });
}

module.exports = { authenticateToken, authenticateAdminToken };
