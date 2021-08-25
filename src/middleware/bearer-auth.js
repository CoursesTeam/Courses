
'use strict';

module.exports=(students)=>(req,res,next)=>{
    if(!req.headers.authorization){
        console.error('No authorization found ');
        next('Invaild login');
        return
    }
    let acsessToken=req.headers.authorization.split(' ').pop();
    students.authenticateBearer(acsessToken)
    .then((student)=>{
        req.student=student;
        next();
    })
    .catch((err) => next('Invalid login'))
}

