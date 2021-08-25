// 'use strict';
// const base64=require('base-64');


// module.exports=(students)=>(req,res,next)=>{
//     if(!req.headers.authorization){
//         next('Invaild login');
//         return
//     }
//     // hgdajdhajsdkjk
//     const encodedCredintials = req.headers.authorization.split(' ').pop();
//     //username:password
//     const [username, password] = base64.decode(encodedCredintials).split(':');

//     students.authenticateBasic(username, password)
//         .then((student) => {
//             req.student = student;
//             next();
//         })
//         .catch((error) => next('Invalid login'));
// }

'use strict';
const base64 = require('base-64');
const { users } = require('../models/index.js')
module.exports = async (req, res, next) => {
  if (!req.headers.authorization) { return next('Invalid Login  vvv');}
  let basic = req.headers.authorization.split(' ').pop();
  let [username, pass] = base64.decode(basic).split(':');
  try {
    req.user = await users.authenticateBasic(username, pass);
    next();
  } catch (e) {
    res.status(403).send('Invalid Login lll');
  }
}