'use strict';

module.exports=(capability)=>{
    return(req,res,next)=>{
        if(req.user.capabilities.includes(capability)) {
            console.log('Acl this student has capability to :', req.user.capabilities);
            next()
        }else{
            next('Acsses Denied')
        }
    }
}