const userAuthor=require('../models/userAuthormodel');

async function createUserAuthor(req,res){
// logic to create user-or-author
// get user or author req
const newUserAuthor=req.body;
// find the email
const userAuthorDoc=await userAuthor.findOne({email:newUserAuthor.email});
if(userAuthorDoc!=null){
    if(newUserAuthor.role===userAuthorDoc.role){
        res.status(200).send({message:newUserAuthor.role,payLoad:userAuthorDoc});
    }else{
        res.status(200).send({message:"Invalid role"});
    }
}else{
    const newUser=new userAuthor(newUserAuthor);
    await newUser.save();
    console.log(newUser)
    res.status(201).send({message:newUser.role,payLoad:newUser})
}

}
module.exports=createUserAuthor;