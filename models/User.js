const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const userSchema=new Schema(
    {
    name:{
        type:String
    },
    height:{
        type:String,
    },
    weight:{
        type:String
    },
    role: {
        type: String
    }, 
    age:{
        type:String
    },
    lmp:{
        type:Date
    },
    edd:{
        type:Date
    },
    isOnboarding:{
        type:Boolean,
        required:false
    },
    isVerified:{
        type:Boolean,
        required:false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },   
    menstrualHistory:{
        type:String
    },
    medicalHistory:{
        type:Object
    },
    pushToken:{
        type:String
    },
    emergencyNumber:{
        type:Array
    },
}, { timestamps: true })

module.exports=mongoose.model("User",userSchema);



