const mongoose =require("mongoose");
const Schema =  mongoose.Schema;

//Schema defintion
const  dietSchema = new Schema({
    category:{
        type: Schema.ObjectId, 
        ref: 'categories'
    },
    week:{
        type: Number,
        required: true
    },
    day:{
        type:String,
        required: true
    },
    type:{
        type:String,
        required: true
    },
    breakfast:{
        type:Array,
        required: true
    },
    morningSnack:{
        type:Array,
        required: true
    },
    lunch:{
        type:Array,
        required: true
    },
    eveningSnack:{
        type:Array,
        required: true
    },
    dinner:{
        type:Array,
        required: true
    }
},{ timestamps: true });
module.exports = mongoose.model('diet', dietSchema);