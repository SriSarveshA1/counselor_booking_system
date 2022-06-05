const db=require("../models/index");
const Counselor=db.Counselor;
const Op=db.Sequelize.Op;

//So using method we can create the new councellor that can be activated in our service
exports.create=(req, res, next)=>{
    const data={
        id:req.body.id,
        Name:req.body.name,   
        AddedOn:req.body.addedOn
    };
   
    Counselor.findOne({where:{id:req.body.id}}).then((content) => {      
        if(!content)
        {    
            Counselor.create(data).then((Counselors)=>{
                return res.status(200).send(Counselors);
            }).catch((err)=>{
               return res.status(500).send({message:err.message});
            })
           
        }
        else{
            return res.status(400).send("There is already a Councellor with same data");
        
        }
    }).catch((err)=>{
        return res.status(500).send({message:err.message});
    });
}

//To Get all the Councellors registered in our application
exports.getList=(req, res) => {
    Counselor.findAll().then((Counselors)=>{
        res.status(200).send(Counselors)
    }).catch((err)=>{
        res.status(500).send({message:err.message});000
    })
}

//To update the Councellor information
exports.update=(req, res, next) =>{
    const data={
        id:req.body.id,
        Name:req.body.name,   
        AddedOn:req.body.AddedOn
    }
    Counselor.update(data,{
        where:{
            id:req.params.id
        },
        returning:true
    }).then(()=>{
        Counselor.findByPk(req.params.id).then((data)=>{
            res.status(201).send(data);
        })
    }).catch((err)=>{
        res.status(500).send({message:err.message});
    })
}
//So we need to pass the id of the councellor that we want to check whether it is available to rent or not
exports.isAvailRent=(req, res) => {
    Counselor.findByPk(req.params.id).then((Counselors)=>{
        let value=Counselors.isBooked;
        res.status(200).send("Is Rented: " + value);
    })
}
//So We can check the councellors that are rented by the given user(id)
exports.rentedByUser=(req, res) => {
    Counselor.findAll({where:{UserId:req.params.id}}).then((Counselors)=>{
        res.status(200).send(Counselors);
    })
}
//so we can Book,return the booking,delete the councellor info here
exports.mutate=(req, res) => {
    let del=req.query.delete;
    let rent=req.query.rented;
    let ret=req.query.return;
    let promise=null;
    if(del){
       //deleting (the id of the Counselors will be passed in the req body)
       promise=Counselor.destroy({where: {id:req.body.id}}).then(()=>{
           res.status(200).send("Deleted Successfully");
       })
    }
    if(rent){
       //renting the service
       const data={
           isBooked:"Yes",
           UserId:req.UserId
       }
       //user should not be able to rent more than 2 Counselors at a time
       if(req.body.ids.length > 2)
       {
        res.status(400).send("You cant rent more than 2 Counselors at a time");
       }
       promise=Counselor.update(data,{where:{id:{[Op.or]:req.body.ids}},returning:true}).then(()=>{
        Counselor.findAll({where:{id:{[Op.or]:req.body.ids}}}).then((Counselors)=>{
               res.status(200).send(Counselors);
           })
       })
    }
    if(ret){
       //returning the service
       const data={
           isBooked:"No",
           UserId:null
       }
       promise=Counselor.update(data,{where:{id:{[Op.or]:req.body.ids}},returning:true}).then(()=>{
        Counselor.findAll({where:{id:{[Op.or]:req.body.ids}}}).then((Counselors)=>{
            res.status(200).send(Counselors);
        })
       })
    }
    promise.catch((err)=>{
        res.status(500).send({message:err.message});
    })
}