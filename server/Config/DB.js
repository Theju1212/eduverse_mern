const mongoose=require("mongoose");
const dotenv=require("dotenv");


dotenv.config();

const dbConnect=async()=>{
   try{
    mongoose.connect(process.env.URL);
    console.log("Database Connected Successfully");
   }
   catch(err){
    console.log("error",err);
   }

}


dbConnect();