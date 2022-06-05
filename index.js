const express = require("express");
const app = express();
const bodyParser=require("body-parser");
app.use(bodyParser.json());
const db=require("./models/index");

function init() {
 var data=[
     {
         id:1,
         name:"Renter"
     },
     {
         id:2,
         name:"Admin"
     }
 ]
 db.Role.bulkCreate(data).then(()=>{
     console.log("Roles added successfully")
 }).catch(err=>{
     console.log(err)
 })
}

db.sequelize.sync({force: true}).then(() =>{
    init();
    console.log("created");
    
}).then((err)=>{
    console.log(err)
});

require("./routes/authRoutes")(app);
require("./routes/counselorRoutes")(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log("Server has started at port " + PORT));
