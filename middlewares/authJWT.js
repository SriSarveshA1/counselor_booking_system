const config=require('../configs/secret.config');
const jwt=require('jsonwebtoken');
const db=require('../models/index');
const User=db.User;


const verifyToken=(req,res, next)=>{
    const token=req.headers['x-access-token'];
    if(!token)
    {
       return res.status(403).send("Send some valid token");
    }
    jwt.verify(token,config.secret,(err,decodedKey)=>{
        if(err)
        {
             res.status(400).send("not an authorized token");
             return;
        }
        else{
            req.UserId=decodedKey.id;
            next();
        }
       
    })
}
const checkAdmin=(req, res,next) =>{
    var arr=[];
       User.findByPk(req.UserId).then((user) =>{
           user.getRoles().then((roles) =>{
            
            if(roles)
            {
                for(var i=0;i<roles.length;i++){
                    console.log(roles[i].name);
                 
                      arr.push(roles[i].name);
                      
                  
                }
                if(arr.includes("admin")||arr.includes("Admin"))
                {
                    next();
                    return;

                }
                else{
                    return res.status(400).send({message:"User is not admin"})
    
                 } 
            }
             
           })
       })
       
    }
        

module.exports ={
    verifyToken,
    checkAdmin
}