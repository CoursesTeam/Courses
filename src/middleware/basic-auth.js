'use strict';
const base64=require('base-64');


module.exports=(students)=>(req,res,next)=>{
    if(!req.headers.authorization){
        next('Invaild login');
        return
    }
    // hgdajdhajsdkjk
    const encodedCredintials = req.headers.authorization.split(' ').pop();
    //username:password
    const [username, password] = base64.decode(encodedCredintials).split(':');

    students.authenticateBasic(username, password)
        .then((student) => {
            req.student = student;
            next();
        })
        .catch((error) => next('Invalid login'));
}