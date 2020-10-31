const jwt = require("jsonwebtoken");
const { jwtConfig } = require('../../config');
const _ = require('lodash');

function createJwt(data){
  try{
    let pickedData = _.pick(data, ['its_id', 'jamaat', '_id','role'])
    let token = jwt.sign(pickedData, jwtConfig.secret);
    console.log("createJwt -> token", token)
    return { token }
  }catch(err){
    console.log("createJwt -> err", err)
    throw err;
  }
}


function jwtHandler(token) {
  try {
    const decoded = jwt.verify(token, jwtConfig.secret );
    return decoded;
  } catch (err) {
    console.log("jwtHandler -> err", err)
    throw err;
  }
}


export { jwtHandler , createJwt }