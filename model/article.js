const mongoose= require('mongoose');

let schema =mongoose.Schema;

let articleSchema = new schema({
    title :{
        type : String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})
let Article=module.exports=mongoose.model("Article",articleSchema)