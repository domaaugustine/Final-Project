const exp=require('express')
const userApp=exp.Router();
// import the model
const userAuthor=require('../models/userAuthormodel')
const expressAsyncHandler=require('express-async-handler');
const createUserAuthor = require('./createUserAuthor');
const Article=require('../models/ArticleModel')

// API
userApp.post('/user',expressAsyncHandler(createUserAuthor))

// add comment 
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
    const getComment=req.body;
    console.log(getComment,"article id is",req.params.articleId)
    if(req.params.articleId!=undefined){
    const articleWithComment=await Article.findOneAndUpdate({articleId:req.params.articleId},{$push:{comments:getComment}},{new:true})
    res.status(200).send({message:"comment added",payLoad:articleWithComment})
    }
    res.send({message:"not added"})
}))

module.exports=userApp;