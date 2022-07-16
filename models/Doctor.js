const mongoose =require("mongoose");
const Schema =  mongoose.Schema;

//Schema defintion
const doctorSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type:String
    },
    distance:{
        type:Number,
        default: 0
    },
    category:{
        type: String
    }
},{ timestamps: true });
module.exports = mongoose.model('doctor',doctorSchema);