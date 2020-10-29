const jwt = require("jsonwebtoken");
const { jwtConfig } = require('../../config') 

function jwtHandler(token) {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret );
    return decoded;
  } catch (err) {
    console.log("jwtHandler -> err", err)
    throw err;
  }
}


export { jwtHandler }