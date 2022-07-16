const mongoose =require("mongoose");
const Schema =  mongoose.Schema;

//Schema defintion
const commentSchema = new Schema({
    message:{
        type:String,
        required:true        
    },
    post:{
        type:Schema.ObjectId,
        ref: 'posts',
        required:true
    },
    user:{
        type:Schema.ObjectId,
        ref: 'users',
        required:true
    }
},{ timestamps: true });
module.exports = mongoose.model('comment', commentSchema);