const mongoose=require('mongoose')

// author data schema
const authorDataSchema=new mongoose.Schema({
    nameOfAuthor:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        required:true
    }
},{"strict":"throw"})

// create user comment scehma
const  userCommentSchema =new mongoose.Schema({
    nameOfUser:{
            type:String,
            required:true
    },
    comment:{
        type:String,
        required:true
       }
},{"strict":"throw"})

// original schema
const articleSchema=new mongoose.Schema({
   authorData:{
    type:authorDataSchema
   },
   articleId:{
    type:String,
    required:true
   },
   title:{
    type:String,
    required:true
   },
   category:{
    type:String,
    required:true
   },
   content:{
    type:String,
    required:true
   },
   dateOfCreation:{
    type:String,
    required:true
   },
   dateOfModification:{
    type:String,
    required:true
   },
   comments:{
    type:[userCommentSchema],
    required:true
   },
   isArticleActive:{
   type:Boolean,
   required:true
   }
},{"strict":"throw"})

// model
const Article=mongoose.model("article",articleSchema)

module.exports=Article;