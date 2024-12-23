const express=require("express");
const app=express();
const mongoose=require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/myDB",(err)=>{
    if(err)
    console.log("DB Not connected-Error");
else
console.log("DB Connected");
});
//Creating Schema
const ns=new mongoose.Schema({
    fullname: String,
    email: String,
    phno: Number,
    pincode: Number,
    state: String,
    city: String,
    address: String,
    size: Number,
    color: String,
    qnt: Number,
    payment: String
});
//Creating Model
const nm=new mongoose.model("users",ns);
//Deleting a specific record from db
nm.remove({}).then(function(){
    console.log("Data Deleted");
}).catch(function(error){
    console.log(error);
});