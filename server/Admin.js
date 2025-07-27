const bp = require("bcrypt");
const Admin = require("./Model/Admin");
require("./Config/DB");

async function adminAccount() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashPassword = await bp.hash('admin@password', 10);
      const newAdmin = new Admin({
        email: "admin@gmail.com",  
        password: hashPassword,
        role: "admin" 
      });
      await newAdmin.save();
      console.log("Admin account created");
    } else {
      console.log("Admin account already exists");
    }
  } catch (err) {
    console.log(err);
  }
}

adminAccount();