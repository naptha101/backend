const express=require("express")
const router=express.Router();
const mongoose=require("mongodb")
const user=require('../model/user');

router.get("/get",async (req,res,next)=>{

const data=await user.find();

return res.send(data);


})

// router.post("/image",(req,res,next)=>{

// })

module.exports =router;