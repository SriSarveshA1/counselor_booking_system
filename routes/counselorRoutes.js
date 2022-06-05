const counselorController=require("../controllers/counselorController");
const authJwt=require("../middlewares/index").authJwt
module.exports=(app)=>{
    app.post("/counselors/",[authJwt.verifyToken,authJwt.checkAdmin],counselorController.mutate);
    app.post("/counselors/create",[authJwt.verifyToken,authJwt.checkAdmin],counselorController.create);
    app.get("/counselors/list",[authJwt.verifyToken],counselorController.getList);
    app.put("/counselors/update/:id",[authJwt.verifyToken],counselorController.update);
    app.get("/counselors/isAvail/:id",[authJwt.verifyToken],counselorController.isAvailRent);
    app.get("/counselors/rented/:id",[authJwt.verifyToken],counselorController.rentedByUser);
   
}