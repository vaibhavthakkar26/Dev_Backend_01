const jwt = require("jsonwebtoken");

const jwtObj = {
  JWTSECRET: "JWTSECRET33222$RCA#Front@done",
  JWTREFRESHSECRET: "JWTSECQWERTYET$RCA#Front@done",
  JWTEXPIRY: "1h",
  JWTREFRESHEXPIRY: "3h",
};

const createToken = (id) => {
    const payload = {
      _id: id,
    };
    return jwt.sign(payload, jwtObj.JWTSECRET, {
      expiresIn: jwtObj.JWTEXPIRY,
    });
};

const verifyJWT = (req, res,next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'user unauthorized' });
  }
  try {
    const userInfo = jwt.verify(token, jwtObj.JWTSECRET);
    console.log("userInfo",userInfo);
    req.user = userInfo;
    next();
  } catch (error) {
    console.log("err",error);
    return res.status(401).json({ message: 'user unauthorized' });
  }
};

module.exports = { createToken, verifyJWT }