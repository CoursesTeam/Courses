'use strict';

module.exports=(capability)=>{
    return(req,res,next)=>{
        if(req.student.capability.includes(capability)) {
            console.log('Acl this student has capability to :', req.student.capability);
            next()
        }else{
            next('Acsses Denied')
        }
    }
}