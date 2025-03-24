const exp=require('express')
const adminApp=exp.Router();
// import the model
const admin=require('../models/adminModel');
const expressAsyncHandler = require('express-async-handler');

// import model of user-author
const userAuthor=require('../models/userAuthormodel');

adminApp.get('/getadminDetails',async(req,res)=>{
    const adminsList=await admin.find();
  res.send({message:"loaded sucessfully",payLoad:adminsList});
})

// to check the admin and to save
adminApp.post('/admin',expressAsyncHandler(async(req,res)=>{
  const newAdmin=req.body;
  const isAdminExits=await admin.findOne({email:newAdmin.email});
  if(isAdminExits!=null){
    if(isAdminExits.role==newAdmin.role){
      res.send({message:"admin",payLoad:isAdminExits});
    }
    res.send({message:"invalid Role"});
  }
  else{
    const adminObj=new admin(newAdmin)
    await adminObj.save();
    console.log(adminObj)
    res.send({message:"admin",payLoad:adminObj})
  }
}))

// to get the details of users adnd authors
adminApp.get('/getUserAuthorDetails',expressAsyncHandler(async(req,res)=>{
     const getDetails=await userAuthor.find();
     res.status(201).send({message:"success",payLoad:getDetails})
}))

// to inactive a user r author
adminApp.post('/inactive', expressAsyncHandler(async (req, res) => {
  try {
    const getUser = req.body;
    console.log("Received user:", getUser);

    const userToModify = await userAuthor.findOne({ email: getUser.email });
    console.log(userToModify)
    if (userToModify) {
      userToModify.isActive = false;
      await userToModify.save();  
      console.log("Modified user:", userToModify);
      res.status(200).send({ message: "inactive", user: userToModify });
    } else {
      console.log("No user found");
      res.status(404).send({message: "User not found" });
    }
  } catch (error) {
    console.error("Error modifying user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}));

// to active the user
adminApp.post('/active', expressAsyncHandler(async (req, res) => {
  try {
    const getUser = req.body;
    console.log("Received user:", getUser);

    const userToModify = await userAuthor.findOne({ email: getUser.email });
    console.log(userToModify)
    if (userToModify) {
      userToModify.isActive = true;
      await userToModify.save();  
      console.log("Modified user:", userToModify);
      res.status(200).send({ message: "inactive", user: userToModify });
    } else {
      console.log("No user found");
      res.status(404).send({message: "User not found" });
    }
  } catch (error) {
    console.error("Error modifying user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
}));


module.exports=adminApp;