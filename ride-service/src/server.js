require("dotenv").config();

const express = require("express");

const app = express();

const rideRoutes =
require("./routes/rideRoutes");

const {
 createRideTable
} = require("./models/rideModel");

app.use(express.json());

app.use("/api/rides",rideRoutes);

app.get("/health",(req,res)=>{

 res.json({
   service:"ride-service",
   status:"UP"
 });

});

const PORT =
process.env.PORT || 8084;

app.listen(PORT,async()=>{

 try{

   await createRideTable();

   console.log(
    `Ride Service running on ${PORT}`
   );

 }catch(err){

   console.error(err);

 }

});
