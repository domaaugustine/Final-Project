const mongoose=require('mongoose')
// create a schema
const userAuthorSchema=new mongoose.Schema({
  role:{
    type:String,
    required:true
  },
  firstName:{
    type:String,
    required:true
  },
  lastName:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  profileImageUrl:{
    type:String
  },
  isActive:{
    type:Boolean,
    default:true
  }
},{"strict":"throw"})
// model
const userAuthor=mongoose.model("userAuthor",userAuthorSchema);
module.exports=userAuthor;