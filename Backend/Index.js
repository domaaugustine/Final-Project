require('dotenv').config();//available in process 

// importing express
const exp=require('express');
const app=exp();

// importing the port and url from .env
const port=process.env.PORT||4000;
const url=process.env.DBURL;

// connecting frontend to the backend using cors
const cors=require("cors");
app.use(cors());

// import mongoose
const mongoose=require('mongoose');

// get the api from the files
const authorApp=require('./APIs/AuthorApi');
const adminApp=require('./APIs/AdminApi');
const userApp=require('./APIs/UserApi');

//inbuilt middleware for post req
app.use(exp.json());

// assing port-url for the diff api's
app.use("/user-api",userApp);
app.use('/admin-api',adminApp);
app.use("/author-api",authorApp);

// connecting mongoose
mongoose.connect(url)
.then(()=>{app.listen(port,()=>{console.log(`server started at port: ${port}`)});
})
.catch(err=>console.log("err"))

// error handler
app.use((err,req,res,next)=>{
    console.log("eror obj",err);
    res.send({message:err.message})
})
