const db=require("../models/index");
const User=db.User;
const Role=db.Role;
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const secret_config=require("../configs/secret.config");
const Op=db.Sequelize.Op;
exports.Signup=(req,res,next)=>{
    const data={
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8)
    };
    User.create(data).then(user=>{
        
        if(req.body.roles)
        {
           Role.findAll({where: {name:{[Op.or]:req.body.roles}}}).then((roles)=>{
              user.setRoles(roles).then(()=>{
                  res.status(201).send("Roles assigned successfully and registration done")
              }).catch((err)=>{
                  res.status(500).send({message: err.message});
              });
           })
        }
        else{
            user.setRoles([1]).then(()=>{
                res.status(201).send("Registration successfully");
            }).catch((err)=>{
                res.status(500).send({message: err.message});
            })
        } 

    }).catch(err=>{
        res.status(500).send({message:err.message});
    })
}

exports.Login=(req,res,next)=>{
    User.findOne({where: {email:req.body.email}}).then((user)=>{
        if(!user)
        {
            res.status(404).send({message: 'User not found'});
        }
        var bool=bcrypt.compareSync(req.body.password,user.password);
        if(!bool)
        {
            res.status(400).send({message: 'Password wrong'});
        }
        var token=jwt.sign({id:user.id},secret_config.secret,{expiresIn:300});
        var uo={
            name:user.name,
            token:token
        }
        res.status(200).send(uo);
    })
}