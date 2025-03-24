const exp=require('express')
const authorApp=exp.Router();
require('dotenv').config();
// clerk
const {requireAuth, clerkMiddleware}=require('@clerk/express')
authorApp.use(clerkMiddleware())
// import the model
const userAuthor=require('../models/userAuthormodel');
const expressAsyncHandler=require('express-async-handler')
const createUserAuthor = require('./createUserAuthor');
const Article=require('../models/ArticleModel')

// authorization
authorApp.get('/unauthorised',(req,res)=>{
  res.send({message:"unauthorised request.. plz login"})
})

authorApp.post('/author',expressAsyncHandler(createUserAuthor))

// check the existed user
authorApp.post('/checkEmail',expressAsyncHandler(async(req,res)=>{
  const eml=req.body;
  console.log(eml)
  const isAuthorExists=await userAuthor.findOne({email:eml.email})
  console.log(isAuthorExists)
  if(isAuthorExists!=null){
    res.send({message:true,payLoad:isAuthorExists});
  }
  res.send({message:false,payLoad:null});
}))

// create new article 
authorApp.post('/article',expressAsyncHandler(async(req,res)=>{
  const newArticleObj=req.body;
  const newArticle=new Article(newArticleObj)
 const Obj= await newArticle.save();
  res.status(201).send({message:"article published",payLoad:Obj})
}))

// to read all articles
// ,requireAuth({signInUrl:"unauthorized"})
authorApp.get('/articles',requireAuth({signInUrl:"unauthorized"}),expressAsyncHandler(async(req,res)=>{
  const listOfArticles=await Article.find({isArticleActive:true});
  res.status(200).send({message:true,payLoad:listOfArticles});
})
)

//update article by id
// ,requireAuth({signInUrl:"unauthorized"})
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
  // get modified article
     const modifiedArticle=req.body;
    // const modifiedArticle=req.params._id;
    //  update article by id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false});
    res.status(200).send({message:true,payLoad:latestArticle})
}))

// soft delete the article 
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
  // get modified article
     const modifiedArticle=req.body;
    //  update article by id
    const latestArticle=await Article.findByIdAndUpdate(modifiedArticle._id,{...modifiedArticle},{returnOriginal:false});
    res.status(200).send({message:true,payLoad:latestArticle})
}))

module.exports=authorApp;