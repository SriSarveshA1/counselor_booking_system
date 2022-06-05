const authController=require("../controllers/authController");
module.exports=(app)=>{
  app.post("/users/create",authController.Signup);
  app.post("/users/login",authController.Login);
}