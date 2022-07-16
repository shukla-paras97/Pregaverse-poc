const mongoose =require("mongoose");
const Schema =  mongoose.Schema;

//Schema defintion
const categoryDataSchema = new Schema({
    category:{
        type: Schema.ObjectId, 
        ref: 'categories',
        required:true
    },
    description: {
        type: String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    }
},{ timestamps: true });
module.exports = mongoose.model('category_data',categoryDataSchema);