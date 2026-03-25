const mongoose = require('mongoose');
const UserSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:Number,
    course:String,
    skills:[String]
});
module.exports=mongoose.model('User',UserSchema);