const mongoose=require("mongoose");

const user=new mongoose.Schema({
name:{
    type:String,
    unique:true,
    required:true

},
email:{
    type:String,
    required:true
    },
    Image:{
        type:[String]


    }


})


// mongoose.model('user',user);

module.exports=mongoose.model('user',user);