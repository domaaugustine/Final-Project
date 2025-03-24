const mongoose=require('mongoose')
// create a schema
const adminSchema=new mongoose.Schema({
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
    required:true
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
const admin=mongoose.model("admin",adminSchema);
module.exports=admin;