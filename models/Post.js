const mongoose =require("mongoose");
const Schema =  mongoose.Schema;

//Schema defintion
const postSchema = new Schema({
    user:{
        type:Schema.ObjectId,
        ref: 'users',
        required:true
    },
    image:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true

    }
},{ timestamps: true });
module.exports = mongoose.model('post',postSchema);