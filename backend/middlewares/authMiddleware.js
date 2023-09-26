const jwt=require('jsonwebtoken');

const requireAuth=(req,res,next)=>{
    const token=req.cookies.jwt;

    //check json web tocken exists & is verified
    if(token){
        jwt.verify(token,'User information secret',(err,decodedToken)=>{
            if (err) {
                console.log(err.message);
                res.send('Login Page');
              } else {
                console.log(decodedToken);
                const { role } = decodedToken;
                if (role === 'nurse') {
                  req.userRole = 'nurse';
                  next();
                } else if (role === 'doctor') {
                  req.userRole = 'doctor';
                  next();
                }
                 else {
                  res.send('Login Page');
                }
              }
            });
    }
    else{
        res.send('Login Page');
    }
}


module.exports={requireAuth};