const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //get token from header
  const token = req.header("x-auth-token");

  //check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // if verified we will have the id of user in decoded as decoded.user
    const decoded = jwt.verify(token, "POStoken");
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
